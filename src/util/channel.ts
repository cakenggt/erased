import { PrivateChannel } from '../messages';

export const getPrivateChannelName = ({ authors }: PrivateChannel) =>
  authors.join('-');
