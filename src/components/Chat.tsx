import * as React from 'react';

import messages, { Message } from '../messages';
import styles from '../styles/Chat.css';
import { getPrivateChannelName } from '../util/channel';

interface ChatWindowProps {
  channel?: string;
}

type ChatWindowState = Record<string, number>;

const LARGE_SCROLL = 10000000;

const generateChatWindowState = () => {
  let state: ChatWindowState = {};
  state = messages.channels.public.reduce((acc, { name }) => {
    acc[name] = LARGE_SCROLL;
    return acc;
  }, state);
  state = messages.channels.private.reduce((acc, channel) => {
    acc[getPrivateChannelName(channel)] = LARGE_SCROLL;
    return acc;
  }, state);
  return state;
};

class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {
  private el: Element;

  private scrollListener = (e: Event) => {
    const { channel = 'general' } = this.props;
    this.setState({ [channel]: this.el.scrollTop });
  };

  public state: ChatWindowState = generateChatWindowState();

  public componentDidMount() {
    this.el.scrollTop = LARGE_SCROLL;
    this.el.addEventListener('scroll', this.scrollListener);
  }

  public componentWillUnmount() {
    this.el.removeEventListener('scroll', this.scrollListener);
  }

  public componentDidUpdate({ channel }: ChatWindowProps) {
    if (this.props.channel !== channel) {
      this.el.scrollTop = this.state[channel];
    }
  }

  public render() {
    const { channel = 'general' } = this.props;

    let displayedMessages: Message[] = [];
    messages.channels.public.forEach(c => {
      if (c.name === channel) {
        displayedMessages = c.messages;
      }
    });
    messages.channels.private.forEach(c => {
      if (channel === getPrivateChannelName(c)) {
        displayedMessages = c.messages;
      }
    });

    let currentDate = displayedMessages[0]
      ? displayedMessages[0].date.toFormat('cccc, LLLL d')
      : '';
    const messagesByDate: { date: string; messages: Message[] }[] = [];
    if (displayedMessages.length) {
      messagesByDate.push({
        date: currentDate,
        messages: []
      });
    }

    for (let message of displayedMessages) {
      let date = message.date.toFormat('cccc, LLLL d');
      if (date === currentDate) {
        messagesByDate[messagesByDate.length - 1].messages.push(message);
      } else {
        currentDate = date;
        messagesByDate.push({
          date,
          messages: [message]
        });
      }
    }

    return (
      <div className={styles.container} ref={ref => (this.el = ref)}>
        {messagesByDate.map(({ date, messages }) => (
          <div>
            <div className={styles['date-separator']} key={date}>
              <span className={styles['date-separator-label']}>{date}</span>
            </div>
            {messages.map(({ author, date, text }, i) => (
              <div key={i}>
                <div>
                  <span>{author}</span>
                  <span>{date.toFormat('h:m a')}</span>
                </div>
                <div>{text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default ChatWindow;
