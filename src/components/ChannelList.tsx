import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import messages from '../messages';
import styles from '../styles/ChannelList.css';

const ChannelList = ({ channel = 'general' }: { channel: string }) => (
  <div>
    <ul>
      {messages.channels.public.map(channelJson => (
        <li key={channelJson.name}>
          <Link
            className={cn({
              [styles.active]: channelJson.name === channel
            })}
            to={`/${channelJson.name}`}
          >
            {channelJson.name}
          </Link>
        </li>
      ))}
    </ul>
    <div>Direct Messages</div>
    <ul>
      {messages.channels.private.map(channelJson => {
        const path = channelJson.authors.join('-');
        return (
          <li key={path}>
            <Link
              className={cn({ [styles.active]: path === channel })}
              to={`/${path}`}
            >
              {channelJson.authors.join(', ')}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default ChannelList;
