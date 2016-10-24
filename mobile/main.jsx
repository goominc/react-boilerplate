import React from 'react';
import { render } from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  require('stylesheets/main.scss'); // eslint-disable-line
}

render(
  <div>Mobile Test</div>,
  document.getElementById('root')
);
