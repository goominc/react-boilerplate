import React from 'react';
import { Route } from 'react-router';

import init from 'common/init';
import App from 'containers/App';
import reducers from 'reducers';

init(
  <div>
    <Route path="/" component={App} />
  </div>,
  reducers,
);
