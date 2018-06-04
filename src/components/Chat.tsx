import * as React from 'react';

import messages, { Message } from '../messages';
import styles from '../styles/Chat.css';

interface ChatWindowProps {
  channel?: string;
}

const LARGE_SCROLL = 10000000;

class ChatWindow extends React.Component<ChatWindowProps> {
  private el: Element;

  public componentDidMount() {
    this.el && (this.el.scrollTop = LARGE_SCROLL);
  }

  public componentDidUpdate({ channel }: ChatWindowProps) {
    if (this.props.channel !== channel) {
      this.el && (this.el.scrollTop = LARGE_SCROLL);
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
      if (channel === c.authors.join('-')) {
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
        {messagesByDate.map(({ date, messages }) => [
          <div key={date}>{date}</div>,
          messages.map(({ author, date, text }, i) => (
            <div key={i}>
              <div>
                <span>{author}</span>
                <span>{date.toFormat('h:m a')}</span>
              </div>
              <div>{text}</div>
            </div>
          ))
        ])}
      </div>
    );
  }
}

export default ChatWindow;
