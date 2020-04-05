const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
// const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
  // webpack模式
  mode: 'development',
  // 入口
  entry: './src/index.js',

  // 出口
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    // 设置别名
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },
  // 配置loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-start',
      filename: 'index.html',
      template: './index.html',
      inject: true,
      favicon: '',
      minify: false,
      hash: true,
    }),
  ],
  devServer: {
    contentBase: DIST_PATH,
    hot: true,
    historyApiFallback: true,
    compress: false,
    port: 9000,
    open: true,
  },
};
