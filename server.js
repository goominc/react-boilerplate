const MobileDetect = require('mobile-detect');
const bodyParser = require('body-parser');
const connect = require('connect');
const express = require('express');
const morgan = require('morgan');
const omit = require('lodash.omit');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');

const app = express();
app.set('view engine', 'pug');

// morgan
app.use(morgan('dev'));

// MobileDetect
app.use((req, res, next) => {
  const md = new MobileDetect(req.headers['user-agent']);
  req.device = md.mobile() ? 'mobile' : 'desktop'; // eslint-disable-line no-param-reassign
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static('dist'));
} else {
  const webpackMiddlewares = {};
  config.forEach((c) => {
    const compiler = webpack(c);
    const middleware = connect();
    middleware.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config[0].output.publicPath,
    }));
    middleware.use(webpackHotMiddleware(compiler, {
      log: console.log, // eslint-disable-line no-console
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }));
    webpackMiddlewares[c.device] = middleware;
  });

  app.use((req, res, next) => {
    webpackMiddlewares[req.device](req, res, next);
  });
}

// Parse application/json
app.use(bodyParser.json());

// Ping
app.get('/ping', (req, res) => {
  console.log('ping'); // eslint-disable-line no-console
  res.send('pong');
});

// APIs
const users = [];
app.post('/api/v1/users', (req, res) => {
  const user = req.body;
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].email === user.email) {
      res.status(400).send(`Email ${user.email} already exists`);
      return;
    }
  }
  users.push(JSON.parse(JSON.stringify(user)));
  res.json(omit(user, 'password'));
});

app.post('/api/v1/login', (req, res) => {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].email === req.body.email && users[i].password === req.body.password) {
      res.json(omit(users[i], 'password'));
      return;
    }
  }
  res.status(400).send('Invalid email or password');
});

app.get('/api/v1/main', (req, res) => {
  res.json({
    images: [{
      url: 'http://ameli.co.kr/shop/data/skin/0662thehome_C/new_img/main/ins_bnr16.jpg',
    }],
    bullets: [{
      style: {
        left: '88%',
        top: '45%',
      },
      product: {
        title: 'Brush',
        url: 'http://ameli.co.kr/shop/goods/goods_view.php?goodsno=859',
      },
    }, {
      style: {
        left: '55%',
        top: '60%',
      },
      product: {
        title: 'Skin',
        url: 'http://ameli.co.kr/shop/goods/goods_view.php?goodsno=859',
      },
    }],
  });
});

// views/index.pug
app.get('*', (req, res) => {
  res.render('index', { env: process.env.NODE_ENV, device: req.device });
});

const port = 8080;
app.listen(port);
console.log(`Listening on ${port}`); // eslint-disable-line no-console
