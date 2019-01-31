import { importPath } from "../util/loadable.js";
/**
 * webpackChunkName 为需要按模块切割的名称
 */
const routers = [
  {
    path: "/",
    component: importPath({
      loader: () => import("../pages/Home/Home.js")
    }),
    name: "首页",
    icon: "home"
  },
  {
    path: "/srereere",
    component: importPath({
      loader: () => import("")
    }),
    name: "首wewe页",
    icon: "home"
  },
  {
    path: "/counter",
    name: "测试页面1",
    icon: "minus-circle",
    childRouter: [
      {
        path: "/counter222",
        component: importPath({
          loader: () => import("../pages/Counter/Counter.js")
        }),
        name: "测试页面2",
        icon: "minus-circle"
      },
      {
        path: "/wwwww",
        component: importPath({
          loader: () => import("../pages/Counter/Counter.js")
        }),
        name: "wwwwww",
        icon: "minus-circle"
      }
    ]
  },
  // {
  //   path: "/user",
  //   component: importPath({
  //     loader: () => import("")
  //   }),
  //   name: "用户权限",
  //   icon: "minus-circle"
  // }
];

export default routers;
