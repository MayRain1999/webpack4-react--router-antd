import { SolutionOutlined, AndroidOutlined } from "@ant-design/icons";
import Home from "pages/Home/Home";
import PageOne from "pages/Pageone/PageOne";
import React from "react";
const routersConfig = [
  {
    path: "/",
    name: "首页",
    icon: <AndroidOutlined />,
  },
  {
    path: "/pageone",
    name: "首页",
    icon: <SolutionOutlined />,
  },
];

export default routersConfig;
