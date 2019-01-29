// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import rootReducer from './reducer';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(rootReducer);

// export default store;

// 打印操作日志，方便调试，生产环境可以去掉，用上面的的配置。

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
