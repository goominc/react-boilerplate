import React from 'react';
import { Route } from 'react-router';

import init from 'common/init';
import App from 'containers/App';
import reducers from 'reducers';

init(
  <Route>
    <Route path="/" component={App} />
  </Route>,
  reducers,
);
