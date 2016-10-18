const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  cache: false,
  debug: false,
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'server.js'),
        ],
        include: __dirname,
      },
      {
        test: /\.css$/,
        include: __dirname,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
      { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(sass|scss)$/, loaders: ['style', 'css', 'sass'] },
    ],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'node_modules/grommet/node_modules'),
    ],
  },
};
