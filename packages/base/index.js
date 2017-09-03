import React, { Component } from 'react';

require('./styles/app.scss');

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}
