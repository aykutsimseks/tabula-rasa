import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {

  signOut = () => null

  render() {
    return (
      <div className="controlPanel">
        <Link className="logoContainer" to="/home"></Link>
        <div className="avatar" />
      </div>
    );
  }
}
