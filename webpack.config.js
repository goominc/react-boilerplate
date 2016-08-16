// Copyright (C) 2016 Goom Inc. All rights reserved.

const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';
const device = process.env.DEVICE || 'desktop';

const entry = [`./${device}/main`];
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(mode),
    },
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
];

if (mode === 'production') {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
} else {
  entry.push('webpack-hot-middleware/client');
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry,
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, device),
    ],
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};
