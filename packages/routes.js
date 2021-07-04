import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './base';
import SampleApp from './sample-app';
import AltugFirarda from './altug-firarda';
import Moviera from './moviera';
import Raspa from './raspa';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './base/MuiTheme';

const routes = (
  <App>
    <Route path="/home" component={SampleApp} />
    <Route path="/altug-firarda/:pageId" component={AltugFirarda} />
    <Route path="/altug-firarda" component={AltugFirarda} />
    <Route path="/moviera" component={Moviera} />
    <Route path="/raspa" component={Raspa} />
  </App>
);
export default class AppRoutes extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
          <Router history={this.props.history} key={Math.random()}>
            { routes }
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
