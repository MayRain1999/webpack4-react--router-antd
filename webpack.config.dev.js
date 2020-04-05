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
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000,
              // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        react: {
          test: /react/,
          name: 'react',
        },
        antd: {
          test: /antd/,
          name: 'antd',
        },
      },
    },
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
