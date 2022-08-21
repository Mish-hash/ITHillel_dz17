const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    target : 'node',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
    ],
  },
  resolve: {
    /* fallback: {
      async_hooks: false,
      zlib: false,
      querystring: false,
      node: false,
      buffer: false,
      url: false,
      path: false,
      util: false,
      stream: false,
      fs: false,
      http: false,
      net: false,
      crypto: false,
    }, */
    fallback: {
      async_hooks: require.resolve('async-hooks'),
      querystring: require.resolve('query-string'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      fs: false,
      http: require.resolve('stream-http'),
      zlib: require.resolve('browserify-zlib'),
      node: false,
      // http: require.resolve('stream-http'),
      // path: require.resolve('path-browserify'),
      // querystring: require.resolve('querystring-es3'),
      // stream: require.resolve('stream-browserify'),
      // url: require.resolve('url'),

    },
  },
};