const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true }));
app.use(webpackHotMiddleware(compiler));
app.get('/ping', (req, res) => {
  console.log('ping'); // eslint-disable-line no-console
  res.send('pong');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/desktop/index.html'));
});
app.listen(8080);
