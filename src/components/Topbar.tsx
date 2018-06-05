import * as React from 'react';

export default ({ channel = 'general' }: { channel: string }) => (
  <div>{channel}</div>
);
