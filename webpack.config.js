/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
  entry: './dist/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'swagger-markdown.bin.js',
  },
  optimization: {
    minimize: true,
  },
};
