import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import { incrementCounter } from './actions/tabulaActions';

import ControlPanel from './components/ControlPanel';

/*
            <div>
              <a href="/auth/login/facebook">
                <RaisedButton
                  className="materialButton"
                  label="Login With Facebook"
                  labelPosition="after"
                  primary
                />
              </a>
              &nbsp;
              <a href="/auth/login/google">
                <RaisedButton
                  className="materialButton"
                  label="Login With Google"
                  labelPosition="after"
                  primary
                />
              </a>
              &nbsp;
              <a href="/auth/logout">
                <RaisedButton
                  className="materialButton"
                  label="Logout"
                  labelPosition="after"
                  primary
                />
              </a>
            </div>
            <br />
*/

class SampleApp extends Component {
  render() {
    const { counter, increment } = this.props;

    return (
      <div>
        <ControlPanel />
        <div className="home">
          <div className="fixedHeader homeHeader">
            <div className="title" />
            <div className="buttonContainer" />
          </div>
          <div className="homeGrid">
            <RaisedButton
              className="materialButton"
              label={`Increment: ${counter}`}
              labelPosition="after"
              primary
              onTouchTap={() => { increment(6); }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.toJS().tabularasa;

const mapDispatchToProps = dispatch => bindActionCreators({
  increment: incrementCounter
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleApp);
