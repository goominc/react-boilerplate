import React from 'react';
import { Route } from 'react-router';

import About from 'components/About';
import App from 'containers/App';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import init from 'common/init';
import reducers from 'reducers';

init(
  <div>
    <Route exact path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/signup" component={Signup} />
  </div>,
  reducers,
);
