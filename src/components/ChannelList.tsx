import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import messages from '../messages';
import styles from '../styles/ChannelList.css';
import { getPrivateChannelName } from '../util/channel';

const ChannelList = ({ channel = 'general' }: { channel: string }) => (
  <div className={styles.container}>
    <div className={styles.label}>Channels</div>
    <ul className={styles['channel-list']}>
      {messages.channels.public.map(channelJson => (
        <li className={styles.channel} key={channelJson.name}>
          <Link
            className={cn(styles.link, {
              [styles.active]: channelJson.name === channel
            })}
            to={`/${channelJson.name}`}
          >
            {channelJson.name}
          </Link>
        </li>
      ))}
    </ul>
    <div className={styles.label}>Direct Messages</div>
    <ul className={styles['channel-list']}>
      {messages.channels.private.map(channelJson => {
        const path = getPrivateChannelName(channelJson);
        return (
          <li
            className={cn(styles.channel, {
              [styles.active]: path === channel
            })}
            key={path}
          >
            <Link className={styles.link} to={`/${path}`}>
              {channelJson.authors.join(', ')}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default ChannelList;
