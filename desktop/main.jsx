import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import ConnectedIntlProvider from 'common/i18n/ConnectedIntlProvider';
import About from 'components/About';
import App from 'containers/App';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import reducers from 'reducers';
import 'stylesheets/main.scss';

const middlewares = [thunk, promise];
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger'); // eslint-disable-line
  middlewares.push(createLogger());
}
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(...middlewares));
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
