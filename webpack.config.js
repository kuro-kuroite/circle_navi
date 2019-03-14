const path = require('path');
require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    app: path.resolve(__dirname, 'src/js/app.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  mode: process.env.NODE_ENV || 'development',

  resolve: {
    alias: {
      '@js': path.resolve(__dirname, 'src/js'),
    },
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },

  externals: [nodeExternals()],

  target: 'node',

  node: {
    __dirname: false,
  },
};
