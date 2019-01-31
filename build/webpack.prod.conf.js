const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const DIST_PATH = path.resolve(__dirname, '../dist'); //生产目录

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: DIST_PATH, //出口路径
    filename: 'index.js',
    chunkFilename: '[name]_[hash].js', //按需加载名称
    publicPath: './'
  },
  // 源错误检查
  devtool: 'source-map',
  //模块配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, //排除
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/antd/')
        ], //包括
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      //更改antd主题设置
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              minimize: true,
              modifyVars: {
                'font-size-base': '12px',
                'primary-color': '#0EA679'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  //插件
  plugins: [
    // 处理html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      path: '../public/index.html',
      inject: 'body',
      title: 'Pareto运营平台 ',
      favicon: 'public/favicon.ico',
      filename: 'index.html',
      hash: true,
      minify: {
        html5: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin([
      {
        // from: 'public/index.css',
        // to: '../dist'
      }
    ]),
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/manifest.json')
    }),
    new CopyWebpackPlugin([
      { from: 'dll/Dll.js', to: path.resolve(__dirname, '../dist') }
    ])
  ]
  // 热更新
};
