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
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
  const loaders = [
    {
      test: /\.jsx?$/,
      loader: 'babel',
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
      loader: 'json',
    },
  ];
  const configuration = {
    device,
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${device}.bundle.js`,
      publicPath: '/dist/',
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [
        path.resolve(__dirname),
        path.resolve(__dirname, device),
      ],
    },
    plugins,
    module: { loaders },
  };

  const test = new RegExp(`${device}\\/stylesheets\\/.*\\.scss$`);
  if (mode === 'production') {
    entry.push(path.resolve(__dirname, `${device}/stylesheets/main.scss`));
    plugins.push(new ExtractTextPlugin(`${device}.css`));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }));
    loaders.push({
      test,
      loader: ExtractTextPlugin.extract('css!sass'),
    });
  } else {
    configuration.devtool = '#source-map';

    entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    loaders.push({
      test,
      loaders: ['style', 'css', 'sass'],
    });
  }
  return configuration;
});
