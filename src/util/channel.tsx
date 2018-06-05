import * as React from 'react';

import { EMOJI, EMPTY_EMOJI } from './emoji';
import { PrivateChannel } from '../messages';
import styles from '../styles/channel.css';

export const getPrivateChannelName = ({ authors }: PrivateChannel) =>
  authors.join('-');

export const processText = (text: string): React.ReactChild => {
  let processed = text;
  processed = processed.replace(
    /((https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=\(\),']*))/,
    `<a href="$1" target="__blank">$1</a>`
  );
  processed = processed.replace(/(_(.+?)_)/, '<em>$2</em>');
  processed = processed.replace(/(`(.+?)`)/, '<code>$2</code>');
  processed = processed.replace(
    /(:([\w+-]+?):)/,
    (match, p1, p2) =>
      `<img class="${styles.emoji}" src=${EMOJI[p2] || EMPTY_EMOJI} />`
  );
  processed = processed.replace(/(@\w+)/, `<span class=${styles.at}>$1</span>`);
  return <span dangerouslySetInnerHTML={{ __html: processed }} />;
};
