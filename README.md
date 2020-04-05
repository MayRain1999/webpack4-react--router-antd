# webpack 搭建脚手架

`webpack4` + `antd4` + `react-router-dom5`+`eslint`

## 安装

版本`webpack@4.42.1`

```sh
npm init
```

```sh
npm install --save-dev webpack

npm install --save-dev webpack-cli
```

> 如果提示 webpack-cli 有问题，可以尝试全局安装这两个模块

## 打包输出 js

`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(`module bundler`)

`src/index.js`

```js
let name = '2222';

function getMame(name) {
  console.log(name);
}
```

`package.json`

```json
{
  "name": "webpack-start",
  "version": "1.0.0",
  "description": "webpack 配置 脚手架",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --config  webpack.config.dev.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11"
  }
}
```

```js
// 运行结果 yarn dev
$ webpack --config  webpack.config.dev.js
Hash: 0fb9d2f81be92f8377d9
Version: webpack 4.42.1
Time: 71ms
Built at: 2020-04-04 17:01:30
    Asset      Size  Chunks             Chunk Names
bundle.js  3.84 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/index.js] 68 bytes {main} [built]
✨  Done in 0.88s.
```

当前目录

```sh
├── dist
│   └── bundle.js
├── package.json
├── src
│   └── index.js
└── webpack.config.dev.js
```

## 编译 ES6

`module.rules` 允许你在 `webpack` 配置中指定多个 `loader`。

`ECMAScript6` 实现了很多强大的新特性，借助 `ES6` 我们能用更加优雅的方式完成许多强大的功能。只是鉴于许多老版本的浏览器尚未支持 `ES6` 语法，需要在使用之前转换为 `ES5` 语法，以使其兼容更多的浏览器.这个过程需要借助`Babel`

`Babel` 本质就是一个 `JavaScript` 编译器.

> <https://www.babeljs.cn/>

```sh
npm install -D babel-loader @babel/core @babel/preset-env
```

支持静态属性

```sh
npm install --save-dev @babel/plugin-proposal-class-properties
```

创建`.babelrc` 配置文件

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

## html 模板

> <https://github.com/jantimon/html-webpack-plugin>

```sh
npm install --save-dev html-webpack-plugin
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //webpack模式
  mode: 'development',
  //入口
  entry: './src/index.js',

  //出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //配置loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-start',
      filename: 'index.html',
      inject: true,
      favicon: '',
      minify: false,
      hash: true,
    }),
  ],
};
```

## css

`style-loader` 是将 `css-loader` 打包好的 css 代码以`<style>`标签的形式插入到 `html` 文件中。

`css-loade` 加载器像 `import/require（`）一样解释`@import`和 `url（）`，并将解析它们。

```sh
npm install --save-dev style-loader css-loader
```

## react

```sh
npm install --save react react-dom

npm install --save-dev @babel/preset-react

```

`.babelrc`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //webpack模式
  mode: 'development',
  //入口
  entry: './src/index.js',

  //出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    // 设置别名
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  //配置loader
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
      inject: true,
      favicon: '',
      minify: false,
      hash: true,
    }),
  ],
};
```

```sh

├── dist
│   ├── bundle.js
│   └── index.html
├── index.html
├── package.json
├── src
│   ├── components
│   │   ├── App.jsx
│   │   └── Counter
│   │       ├── Counter.css
│   │       └── Counter.jsx
│   └── index.js
└── webpack.config.dev.js
```

## antd

> <https://ant.design/docs/react/use-with-create-react-app-cn>

```sh
npm install antd

npm install babel-plugin-import --save-dev
npm install --save @ant-design/icons
```

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" },
      "antd"
    ]
  ]
}
```

## dev 开发环境

```sh
npm install webpack-dev-server --save-dev
```

```js
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
    open: true,
  }
```

## react-router

> <https://github.com/ReactTraining/react-router#readme>

安装 `react-router-dom`

```sh
npm install react-router-dom
```

## 状态管理

- redux
- mobx
- dva

这边就不加了

## eslint + prettier

全局安装 `eslint`

运行`eslint --init`即可

注意`node` 的版本.`node>=10`

```json
    "babel-eslint": "^10.1.0",
    "eslint": "^6.8.0",
    "eslint-config-airbnb": "^18.1.0",
    "eslint-config-prettier": "^6.10.1",
    "eslint-import-resolver-webpack": "^0.12.1",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-prettier": "^3.1.2",
    "eslint-plugin-react": "^7.19.0",
    "eslint-plugin-react-hooks": "^3.0.0",
     "husky": "^4.2.3",
    "prettier": "^2.0.2",
    "prettier-eslint": "^9.0.1",
```

- commit 规范

### 安装`Commitizen`

`npm install -g commitizen`

> <https://github.com/commitizen/cz-cli>

凡是用到`git commit`命令，一律改为使用`git cz`

这时，就会出现选项，用来生成符合格式的 `Commit message`

## 分包优化

```js
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {},
    },
  },
```

- chunks: 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为 async
- minSize: 表示在压缩前的最小模块大小，默认为 30000
- minChunks: 表示被引用次数，默认为 1
- maxAsyncRequests: 按需加载时候最大的并行请求数，默认为 5
- maxInitialRequests: 一个入口最大的并行请求数，默认为 3
- automaticNameDelimiter: 命名连接符
- name: 拆分出来块的名字，默认由块名和 hash 值自动生成
- cacheGroups: 缓存组。缓存组的属性除上面所有属性外，还有 test, priority, reuseExistingChunk

  - test: 用于控制哪些模块被这个缓存组匹配到
  - priority: 缓存组打包的先后优先级
  - reuseExistingChunk: 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块

> <https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366>
>
> <https://github.com/xiaoping027/webpack4-react-redux-router-antd>
