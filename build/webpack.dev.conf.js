const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIST_PATH = path.resolve(__dirname, "../dist"); //生产目录
const APP_PATH = path.resolve(__dirname, "../src"); //源文件目录

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: DIST_PATH, //出口路径
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js", //按需加载名称
    // publicPath: "/"
  },
  // 源错误检查
  devtool: "inline-source-map",
  //模块配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, //排除
        include: [path.resolve(__dirname, "../src"),path.resolve(__dirname,"../node_modules/antd/")], //包括
        use: {
          loader: "babel-loader"
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
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: {
                "@primary-color": "#1890ff",
                "@link-color": "#1DA57A",
                "@border-radius-base": "2px",
                "@font-size-base": "12px"
              },
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "body",
      favicon: "public/favicon.ico",
      title: "Pareto",
      overlay: true,
      minify: {
        html5: false
      },
      hash: false
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  // 热更新
  devServer: {
    port: "3300",
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true, // 开启
    https: false,
    compress: false,
    noInfo: true,
    open: true,
    proxy: {
      // '/': {
      //   target: '',
      //   changeOrigin: true,
      //   secure: false,
      // },
    }
  }
};
