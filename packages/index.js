import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';

import AppRoutes from './routes';

import reducers from './reducers';


// injectTapEventPlugin();

const rootEl = document.getElementById('root');

const store = createStore(reducers);

ReactDOM.render(
  <AppContainer>
    <AppRoutes store={store} />
  </AppContainer>,
  rootEl);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./routes').default;
    store.replaceReducer(require('./reducers').default);
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      rootEl);
  });
}
