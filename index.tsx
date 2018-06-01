import * as React from 'react';
import ReactDOM from 'react-dom';

import messages from './messages';

class HelloMessage extends React.Component {
  render() {
    return <div>{JSON.stringify(messages)}</div>;
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage />, mountNode);
