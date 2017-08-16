import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { Provider } from 'react-redux';

import App from './App';
import TabulaRasa from './tabularasa';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './MuiTheme';


const routes = (
  <Route component={App}>
    <Route path="/(home)" component={TabulaRasa} />
  </Route>
);

export default class AppRoutes extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
          <Router history={browserHistory} key={Math.random()}>
            { routes }
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
