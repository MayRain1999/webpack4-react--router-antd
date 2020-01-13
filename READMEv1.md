[toc]
# webpack4学习记录
## 安装和初始化
首先附上官方的[文档](https://www.webpackjs.com/guides/)

github地址  
> https://github.com/xiaopingzhang0207/webpack4-react-redux-router-antd

会不定时更新,如果觉得有帮助到你，给个Star当做鼓励可好。
```
.
├── README.md
├── build
│   ├── webpack.dev.conf.js
│   ├── webpack.dll.conf.js
│   └── webpack.prod.conf.js
├── dist
├── dll
├── manifest.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── components
│   │   ├── Bread
│   │   │   └── Bread.js
│   │   └── SiderBar
│   │       └── SiderBar.js
│   ├── index.js
│   ├── layouts
│   │   └── BasicLayout.js
│   ├── pages
│   │   ├── Counter
│   │   │   └── Counter.js
│   │   └── Home
│   │       └── Home.js
│   ├── redux
│   │   ├── actions
│   │   │   └── counter.js
│   │   ├── reducer.js
│   │   ├── reducers
│   │   │   └── counter.js
│   │   └── store.js
│   ├── request
│   │   └── request.js
│   ├── router
│   │   └── Router.js
│   └── util
│       └── loadable.js
└── yarn.lock
```

1. 新创建一个目录并初始化npm，在本地安装`webpack`，再安装`webpack-cli`

```
>npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (webpack4)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/xiaopingzhang/UCloud/webpack4/package.json:

{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```
初始化之后按照提示一步步往下就可以了，可以输入该项目的描述等等信息。一开始也没有关系，后面也还可以更改。

下一步 本地安装`webpack`，再安装`webpack-cli`
```
npm install webpack webpack-cli --save-dev
```

**==`--save-dev` 是你开发时候依赖的东西，`--save` 是你发布之后还依赖的东西。==**
```
>npm install webpack webpack-cli --save-dev

> fsevents@1.2.7 install /Users/xiaopingzhang/UCloud/webpack4/node_modules/fsevents
> node install

node-pre-gyp WARN Using needle for node-pre-gyp https download
[fsevents] Success: "/Users/xiaopingzhang/UCloud/webpack4/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" is installed via remote

> webpack-cli@3.2.1 postinstall /Users/xiaopingzhang/UCloud/webpack4/node_modules/webpack-cli
> lightercollective


     *** Thank you for using webpack-cli! ***

Please consider donating to our open collective
     to help us maintain this package.

  https://opencollective.com/webpack/donate

                    ***

npm WARN webpack4@1.0.0 No description
npm WARN webpack4@1.0.0 No repository field.

+ webpack-cli@3.2.1
+ webpack@4.29.0
added 458 packages from 239 contributors and audited 5208 packages in 18.624s
found 0 vulnerabilities
```
安装好之后，也会显示安装的哪个版本，一般安装没有啥问题。实在安装不成功，试一下全局安装。

2.新建`src`文件夹，入口的`js`文件和`html`文件。
```
.
├── index.html
├── package.json
└── src
    └── index.js
```
index.js文件
```js
const component = () => {
  let element = document.createElement("div");

  element.innerHTML = "webpackworks";

  return element;
};

document.body.appendChild(component());


```
index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Start</title>
  </head>

  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>



```

3.学会使用webpack编译文件


输入 `npx webpack`

```
>npx webpack

Hash: 9ad2a368debc9967c1f4
Version: webpack 4.29.0
Time: 269ms
Built at: 2019-01-27 21:15:22
  Asset      Size  Chunks             Chunk Names
main.js  1.01 KiB       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 218 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
再用浏览器打开`index.html`，查看网页是否正常的显示了。
![image](5F378F5114A44901A9003871AB6D9DBA)

**webpack 把入口文件 `index.js` 经过处理之后，生成 `main.js`**

## 配置文件
经过第一部分的尝试，已经初步了解`webpack`的作用，这一部分通过配置文件进行相应的一些设置。
### babel
> Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。

```
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
```
新建babel配置文件.babelrc
```js
{
   "presets": [
     "es2015",
     "react",
     "stage-0"
   ],
   "plugins": []
}
//babel-core 调用Babel的API进行转码
//babel-loader
//babel-preset-es2015 用于解析 ES6
//babel-preset-react 用于解析 JSX
//babel-preset-stage-0 用于解析 ES7 提案
```
### 新建配置文件

```
webpack.base.conf.js

webpack.dev.conf.js

webpack.prod.conf.js
```
分别是公共配置，开发配置，生产配置。
目前目录结构为

```
.
├── build
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── dist
│   └── main.js
├── index.html
├── package.json
└── src
    └── index.js
```
#### 加载js/jsx文件
```
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
```
在 src 目录下新建`.babelrc`


```js
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": [">1%", "last 3 versions"]
        }
      }
    ],
    "stage-2",
    "latest",
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    "transform-class-properties",
    <!--[-->
    <!--  "import",-->
    <!--  {-->
    <!--    "libraryName": "antd",-->
    <!--    "libraryDirectory": "es",-->
    <!--    "style": true-->
        // "style": "css" //主题设置
    <!--  }-->
    <!--]--> 
    不用antd 可以去掉
  ]
}


```

文件新增

```
    {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, //排除
        include: [
          path.resolve(__dirname, '../src')
        ], //包括
        use: {
          loader: 'babel-loader'
        }
      },
```

#### 加载CSS文件
```
npm install --save-dev style-loader css-loader
```
在配置文件里添加
```
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
```
#### 加载图片

```
npm install --save-dev url-loader file-loader
```
在配置文件里添加
```
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
      }
```
`options limit:8192`意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。

#### 加载less

在这个踩了一个坑，记得安装 `less`
```
npm install --save-dev less-loader less
```

更改antd 默认主题设置需要，不用的话应该把相应的设置忽略即可。

```
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
              modifyVars: {
                'font-size-base': '12px',
                'primary-color': '#0EA679'
              },
              javascriptEnabled: true
            }
          }
        ]
      }
```

#### 加载字体
那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。更新 webpack.config.js 来处理字体文件：
```
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
```

#### 增加HtmlWebpackPlugin
HtmlWebpackPlugin作用是生成一个HTML模板。
HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。

你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader
首先需要安装插件：
```
npm install --save-dev html-webpack-plugin
```
在生产配置文件里添加
```js
 plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'title', // 更改HTML的title的内容
      favicon: 'public/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
```
### 清理 /dist 文件夹
在每次构建前清理 /dist 文件夹.
```
npm install clean-webpack-plugin --save-dev
```
```
new CleanWebpackPlugin(['../dist'])
```
### 模块热替换

> https://webpack.docschina.org/guides/hot-module-replacement

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
有两种方式
#### 一
- 更改package.json
```
"dev": "webpack --config build/webpack.dev.config.js --color --progress --hot"
```
- 更改index.js
```
import React from 'react';
import ReactDom from 'react-dom';

**if (module.hot) {
    module.hot.accept();
}**
//增加

```
#### 二

- 更改配置文件 
```
const webpack = require('webpack');

devServer: {
    hot: true
}

plugins:[
     new webpack.HotModuleReplacementPlugin()
]

```

### redux
>https://www.redux.org.cn/
官方文档先给上，一开始学的时候也以为这个比较难，开始写就不会了。
网上看看例子，自己在coding一下就差不多了。

这边用到了一个中间件 `redux-thunk`

```
npm install --save redux-thunk

```

附上写的代码
#### store
注释的部分为生产环境使用。

为了方便debug代码，在控制台打印readux日志。
```js
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import rootReducer from './reducer';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

// export default store;

// 打印操作日志，方便调试，生产环境可以去掉，用上面注释的配置。

import thunk from "redux-thunk"; // redux 作者开发的异步处理方案 可以在action 里传入 dispatch getState
import { createLogger } from "redux-logger"; // 利用redux-logger打印日志
import { createStore, applyMiddleware } from "redux"; // 引入redux createStore、中间件及compose
import { composeWithDevTools } from "redux-devtools-extension"; // devToolsEnhancer,
import reducer from "./reducer"; // 引入reducers集合

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({ collapsed: true });

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware];

// 创建store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

```

#### action
```js
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const RESET = 'counter/RESET';

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

export function reset() {
  return { type: RESET };
}
```

#### reducer

##### 每个页面的reduce文件

```js
import { INCREMENT, DECREMENT, RESET } from '../actions/counter';

const initState = {
  count: 0,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}

```


##### redecers 整合所有文件的reducer
```js
import { combineReducers } from "redux";

import counter from "./reducers/counter";

export default combineReducers({
  counter
});

```


### react-loadable

>https://github.com/jamiebuilds/react-loadable


官方文档先附上

```js
// 加载页面
import Loadable from 'react-loadable';
import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antLong = (
  <Icon type="loading" style={{ fontSize: 24, color: 'red' }} spin />
);
const antError = (
  <Icon type="loading" style={{ fontSize: 24, color: 'red' }} spin />
);

export const Loading = props => {
  if (props.error) {
    return (
      <Spin
        size="large"
        tip="加载错误 。。。"
        indicator={antError}
        style={{ position: 'absolute', color: 'red', top: '40%', left: '50%' }}
      />
    );
  } else if (props.timedOut) {
    return (
      <Spin
        size="large"
        tip="加载超时 。。。"
        indicator={antLong}
        style={{ position: 'absolute', color: 'red', top: '40%', left: '50%' }}
      />
    );
  } else if (props.pastDelay) {
    return (
      <Spin
        size="large"
        tip="Loading 。。。"
        indicator={antError}
        style={{ position: 'absolute', color: 'red', top: '40%', left: '50%' }}
      />
    );
  } else {
    return null;
  }
};

export const importPath = ({ loader }) => {
  return Loadable({
    loader,
    loading: Loading,
    delay: 200,
    timeout: 10000
  });
};

```

### axios 统一拦截所有的请求和返回数据

在需要用到的地方引入这个文件就ok了。只是简单的写了一个例子，后续再完善吧。axios使用起来很简洁。

```js
import axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 拦截所有有请求与回复
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    message.error("请求错误，请重试");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // NProgress.done();
    // if (response.data.RetCode === 101) {
    //   message.error(response.data.Message);
    //   return response;
    // }
    // if (response.data.RetCode === 100) {
    //   message.error(response.data.Message);
    //   return response;
    // }
    return response;
  },
  error => {
    message.error("请求错误，请重试");
    NProgress.done();
    return Promise.reject(error);
  }
);
export default request;

```


### 公共路径(public path)

## 插件配置

```js

 plugins: [
    // 处理html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      path: '../public/index.html',
      inject: 'body',
      title: '管理平台',
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
      { from: 'dll/Dll.js', to: DIST_PATH }
    ])
  ]

```

### html-webpack-plugin

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
      template: 'public/index.html',
      path: '../public/index.html',
      inject: 'body',
      title: '管理平台',
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
```

### copy-webpack-plugin

```js

const CopyWebpackPlugin = require('copy-webpack-plugin');

new CopyWebpackPlugin([
      { from: 'dll/Dll.js', to: DIST_PATH }
    ])

```

### clean-webpack-plugin

```js

const CleanWebpackPlugin = require('clean-webpack-plugin');

new CleanWebpackPlugin(['../dist'], { allowExternal: true })


```

### webpack-bundle-analyzer

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
  
  new BundleAnalyzerPlugin(),
 
```
### mini-css-extract-plugin

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash].css'
    })
    
```

## 附上三个配置文件

### webpack.dev.conf.js

```js
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, '../dist'); //生产目录
const APP_PATH = path.resolve(__dirname, '../src'); //源文件目录

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: DIST_PATH, //出口路径
    filename: 'index.js',
    chunkFilename: 'js/[name].[chunkhash].js', //按需加载名称
    // publicPath: "./"
  },
  // 源错误检查
  devtool: 'inline-source-map',
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
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
              modifyVars: {
                'font-size-base': '12px',
                'primary-color': '#0EA679'
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
      template: 'public/index.html',
      path: '../public/index.html',
      inject: 'body',
      favicon: 'public/favicon.ico',
      title: '管理平台',
      overlay: true,
      minify: {
        html5: false
      },
      hash: true
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/manifest.json')
    }),
    new CopyWebpackPlugin([
      { from: 'dll/Dll.js', to: DIST_PATH }
    ])
  ],
  // 热更新
  devServer: {
    port: '3300',
    contentBase: DIST_PATH,
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

```
### webpack.dll.conf.js

```js
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
    new CleanWebpackPlugin(['../dll'], { allowExternal: true })
  ]
};

```
### webpack.prod.conf.js

```js

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
    // publicPath: './'
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
      title: '管理平台',
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
      { from: 'dll/Dll.js', to: DIST_PATH }
    ])
  ]
  // 热更新
};

```

## 学习过程中的踩坑
### 生产环境打包报错
```js
ERROR in Path must be a string. Received undefined
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    
```
这个错误不影响打包结果，应该是版本问题导致。

>https://github.com/jantimon/html-webpack-plugin/issues/895

写完才发现有些忘记记录了，会保持更新。





学习的过程中也学习参考了其他优秀的博客和github,以及文档。

>https://github.com/brickspert/blog/issues/1

>https://github.com/NewPrototype/webpack4-es6-react

>https://github.com/axios/axios

>https://github.com/jamiebuilds/react-loadable

>https://www.webpackjs.com/concepts/