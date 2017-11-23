import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import ConnectedIntlProvider from 'common/i18n/ConnectedIntlProvider';

const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];
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
    combineReducers({ ...reducers, router: routerReducer }),
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  render(
    <Provider store={store}>
      <ConnectedIntlProvider>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root'),
  );
};
