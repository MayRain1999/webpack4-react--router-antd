import { importPath } from '../util/loadable.js';
/**
 * webpackChunkName 为需要按模块切割的名称
 */
const routers = [
  {
    path: '/',
    component: importPath({
      loader: () =>
        import(/* webpackChunkName: 'Home' */ '../pages/Home/Home.js')
    }),
    name: '首页',
    icon: 'home'
  },
  {
    name: '测试页面1',
    icon: 'minus-circle',
    childRouter: [
      {
        path: '/counter',
        component: importPath({
          loader: () =>
            import(/* webpackChunkName: 'Counter' */ '../pages/Counter/Counter.js')
        }),
        name: 'Redux测试',
        icon: 'minus-circle'
      },
      {
        path: '/测试2',
        component: importPath({
          loader: () =>
            import(/* webpackChunkName: 'Counter' */ '../pages/Counter/Counter.js')
        }),
        name: 'Redux测试',
        icon: 'minus-circle'
      }
    ]
  }
];

export default routers;
