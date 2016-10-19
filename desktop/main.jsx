import React from 'react';
import { render } from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import About from 'components/About';
import App from 'containers/App';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import i18n from 'i18n';
import reducers from 'reducers';

require('./stylesheets/main.scss');

addLocaleData(en);
addLocaleData(ko);

const locale = 'ko';

const middlewares = [thunk, promise];
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger'); // eslint-disable-line
  middlewares.push(createLogger());
}
const store = createStore(reducers, applyMiddleware(...middlewares));

render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={i18n[locale]}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={Signup} />
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
