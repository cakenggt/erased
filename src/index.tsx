import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import ChannelList from './components/ChannelList';
import Chat from './components/Chat';

class Index extends React.Component<{
  match: { params: { channelName?: string } };
}> {
  render() {
    return (
      <div>
        <ChannelList channel={this.props.match.params.channelName} />
        <Chat channel={this.props.match.params.channelName} />
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
