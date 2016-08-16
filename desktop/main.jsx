import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import About from 'components/About';
import App from 'components/App';
import reducers from 'reducers';

require('./stylesheets/main.scss');

const middlewares = [thunk, promise];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}
const store = createStore(reducers, applyMiddleware(...middlewares));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
