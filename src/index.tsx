import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import styles from './styles/Index.css';
import ChannelList from './components/ChannelList';
import Chat from './components/Chat';
import Topbar from './components/Topbar';

class Index extends React.Component<{
  match: { params: { channelName?: string } };
}> {
  render() {
    return (
      <div className={styles.container}>
        <ChannelList channel={this.props.match.params.channelName} />
        <div className={styles['right-side']}>
          <Topbar channel={this.props.match.params.channelName} />
          <Chat channel={this.props.match.params.channelName} />
        </div>
      </div>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/:channelName" component={Index} />
    </div>
  </Router>,
  mountNode
);
