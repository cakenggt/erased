import * as React from 'react';

import styles from '../styles/UserInput.css';

export default () => (
  <div className={styles.bar}>
    <input
      className={styles.input}
      disabled={true}
      placeholder="You cannot comment in Admin mode"
      type="text"
    />
  </div>
);
