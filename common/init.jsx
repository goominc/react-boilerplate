import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import ConnectedIntlProvider from 'common/i18n/ConnectedIntlProvider';

const middlewares = [thunk, promiseMiddleware(), routerMiddleware(browserHistory)];
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  require('stylesheets/main.scss'); // eslint-disable-line
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { // eslint-disable-line
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  } else {
    const createLogger = require('redux-logger'); // eslint-disable-line
    middlewares.push(createLogger());
  }
}

export default (routes, reducers) => {
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    composeEnhancers(applyMiddleware(...middlewares)));
  const history = syncHistoryWithStore(browserHistory, store);

  render(
    <Provider store={store}>
      <ConnectedIntlProvider>
        <Router history={history}>
          {routes}
        </Router>
      </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root')
  );
};
