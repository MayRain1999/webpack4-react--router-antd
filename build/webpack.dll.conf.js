const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = [
  'antd',
  'axios',
  'nprogress',
  'react',
  'react-dom',
  'react-loadable',
  'react-redux',
  'react-router',
  'react-router-dom',
  'redux'
];

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: 'Dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    }),
    new CleanWebpackPlugin(['../dll'], { allowExternal: true }),
  ]
};
