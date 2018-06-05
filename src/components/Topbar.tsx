import * as React from 'react';

import styles from '../styles/Topbar.css';

export default ({ channel = 'general' }: { channel: string }) => (
  <div className={styles.top}>{channel}</div>
);
