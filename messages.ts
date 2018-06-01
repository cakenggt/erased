import { DateTime } from 'luxon';

import messages from './messages.json';

interface Message {
  author: string;
  date: DateTime;
  text: string;
  reactions: { emoji: string; num: number }[];
}

export type Messages = Record<string, Message[]>;

const parsed: Messages = {};

export default Object.keys(messages).reduce((acc, channel) => {
  acc[channel] = messages[channel].map(({ date, ...rest }) => ({
    ...rest,
    date: DateTime.fromFormat(date, 'yyyy-M-d h:m a')
  }));
  return acc;
}, {});
