import React, { Component } from 'react';

require('@styles/vendor/bootstrap-grid/grid.css');
require('@styles/vendor/react-select.css');
require('@styles/app.scss');

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}
