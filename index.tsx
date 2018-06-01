import * as React from 'react';
import ReactDOM from 'react-dom';

import messages from './messages';

class HelloMessage extends React.Component<{ name: string }> {
  render() {
    return (
      <div>
        Hello {this.props.name} {JSON.stringify(messages)}
      </div>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
