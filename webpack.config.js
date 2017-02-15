const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';
const devices = ['desktop', 'mobile'];

module.exports = devices.map((device) => {
  const entry = [path.resolve(__dirname, `${device}/main`)];
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
    }),
  ];
  const rules = [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-3', 'react'],
        plugins: [['react-intl', {
          messagesDir: './build/messages/',
        }]],
      },
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
  ];
  const configuration = {
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${device}.bundle.js`,
      publicPath: '/dist/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname),
        path.resolve(__dirname, device),
        'node_modules',
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-intl': 'ReactIntl',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-redux': 'ReactRouterRedux',
      redux: 'Redux',
      'redux-promise-middleware': 'ReduxPromiseMiddleware',
      'redux-thunk': 'ReduxThunk',
      superagent: 'superagent',
    },
    plugins,
    module: { rules },
  };

  const test = new RegExp(`${device}\\/stylesheets\\/.*\\.scss$`);
  if (mode === 'production') {
    entry.push(path.resolve(__dirname, `${device}/stylesheets/main.scss`));
    plugins.push(new ExtractTextPlugin({ filename: `${device}.css` }));
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    rules.push({
      test,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
      }),
    });
  } else {
    configuration.devtool = '#source-map';

    entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
    plugins.push(new webpack.HotModuleReplacementPlugin());
    rules.push({
      test,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
    });
  }
  return configuration;
});
