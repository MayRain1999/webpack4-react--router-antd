import { Switch, Route } from "react-router-dom";
import { importPath } from "../util/loadable.js";
/**
 * webpackChunkName 为需要按模块切割的名称
 */
const routers = [
  {
    path: "/",
    component: importPath({
      loader: () => import("../pages/Home/Home.js")
    })
  },
  {
    path: "/home",
    component: importPath({
      loader: () =>
        import(import(/* webpackChunkName:"home" */ "../pages/Home/Home.js"))
    }),
    name: "首页",
    icon: "home"
  },
  {
    path: "/counter",
    component: importPath({
      loader: () =>
        import(import(/* webpackChunkName:"home" */ "../pages/Counter/Counter.js"))
    }),
    name: "测试页面1",
    icon: "minus-circle"
  }
];

const Routers = () => (
  <Switch>
    {routers.map(({ component, path, exact }, index) => {
      return (
        <Route exact={true} path={path} component={component} key={path} />
      );
    })}
  </Switch>
);

export { routers, Routers };
