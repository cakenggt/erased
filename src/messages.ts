import { DateTime } from 'luxon';

import messages from '../messages.json';

interface MessagesJson {
  channels: {
    public: PublicChannelJson[];
    private: PrivateChannelJson[];
  };
}

interface Messages {
  channels: {
    public: PublicChannel[];
    private: PrivateChannel[];
  };
}

interface ChannelJson {
  messages: MessageJson[];
}

interface PublicChannelJson extends ChannelJson {
  name: string;
}

interface PrivateChannelJson extends ChannelJson {
  authors: string[];
}

interface Channel {
  messages: Message[];
}

interface PublicChannel extends Channel {
  name: string;
}

interface PrivateChannel extends Channel {
  authors: string[];
}

interface MessageJson {
  author: string;
  date: string;
  text: string;
  reactions: { emoji: string; num: number }[];
}

export interface Message {
  author: string;
  date: DateTime;
  text: string;
  reactions: { emoji: string; num: number }[];
}

const typedMessagesJson: MessagesJson = messages;

const messageTransformer = ({
  author,
  date,
  ...rest
}: MessageJson): Message => ({
  ...rest,
  author: author.toLowerCase(),
  date: DateTime.fromFormat(date, 'yyyy-M-d h:m a')
});

export default {
  channels: {
    public: typedMessagesJson.channels.public.map(channel => ({
      ...channel,
      messages: channel.messages.map(messageTransformer)
    })),
    private: typedMessagesJson.channels.private.map(channel => ({
      ...channel,
      messages: channel.messages.map(messageTransformer)
    }))
  }
} as Messages;
