import { importPath } from '../util/loadable.js';
/**
 * webpackChunkName 为需要按模块切割的名称
 */
const routers = [
  {
    path: '/',
    component: importPath({
      loader: () => import('../pages/Home/Home.js')
    }),
    name: '首页',
    icon: 'home'
  },
  {
    name: '测试页面1',
    icon: 'minus-circle',
    childRouter: [
      {
        path: '/wwwww',
        component: importPath({
          loader: () => import('../pages/Counter/Counter.js')
        }),
        name: 'wwwwww',
        icon: 'minus-circle'
      }
    ]
  }
];

export default routers;
