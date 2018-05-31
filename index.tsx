import * as React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component<{ name: string }> {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
