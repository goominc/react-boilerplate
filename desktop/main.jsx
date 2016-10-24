import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import ConnectedIntlProvider from 'common/i18n/ConnectedIntlProvider';
import About from 'components/About';
import App from 'containers/App';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import reducers from 'reducers';
import 'stylesheets/main.scss';

const middlewares = [thunk, promiseMiddleware(), routerMiddleware(browserHistory)];
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { // eslint-disable-line
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  } else {
    const createLogger = require('redux-logger'); // eslint-disable-line
    middlewares.push(createLogger());
  }
}
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
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={Signup} />
      </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root')
);
