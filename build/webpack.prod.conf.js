const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIST_PATH = path.resolve(__dirname, "../dist"); //生产目录
const APP_PATH = path.resolve(__dirname, "../src"); //源文件目录

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: DIST_PATH, //出口路径
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js" //按需加载名称
    // publicPath: "./" //公共路径
  },
  // 源错误检查
  devtool: "inline-source-map",
  //模块配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, //排除
        include: [path.resolve(__dirname, "src")], //包括
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"], //为了做图片懒加载，那些属性需要被，制定什么属性被该loader解析
            minimize: false
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  //插件
  plugins: [
    // 处理html
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body",
      title: "ceshi ",
      minify: {
        html5: true
      },
      hash: false
    })
  ]
  // 热更新
};
