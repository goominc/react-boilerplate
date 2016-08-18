const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const _ = require('lodash');

const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true }));
app.use(webpackHotMiddleware(compiler));

// parse application/json
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  console.log('ping'); // eslint-disable-line no-console
  res.send('pong');
});

const users = [];
app.post('/api/v1/users', (req, res) => {
  const user = req.body;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email) {
      res.send(400, `Email ${user.email} already exists`);
      return;
    }
  }
  // copy user since it will be undefined after request end
  users.push(JSON.parse(JSON.stringify(user)));
  res.json(_.omit(user, 'password'));
});

app.post('/api/v1/login', (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === req.body.email && users[i].password === req.body.password) {
      res.json(_.omit(users[i], 'password'));
      return;
    }
  }
  res.send(400, 'Invalid email or password');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/desktop/index.html'));
});

app.listen(8080);
