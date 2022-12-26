/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
  entry: './dist/index.js',
  output: {
    path: path.join(__dirname, 'bin'),
    filename: 'swagger-markdown.js',
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};
