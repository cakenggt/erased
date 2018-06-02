import * as React from 'react';

import messages, { Message } from '../messages';

export default ({ channel = 'general' }: { channel: string }) => {
  const channels: Record<string, Message[]> = {};
  messages.channels.public.forEach(
    channel => (channels[channel.name] = channel.messages)
  );
  messages.channels.private.forEach(
    channel => (channels[channel.authors.join('-')] = channel.messages)
  );

  return (
    <div>
      {channels[channel].map(({ author, text }) => (
        <div>
          {author}
          {text}
        </div>
      ))}
    </div>
  );
};
