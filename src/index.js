import React from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from "antd";
import BasicLayout from "./layouts/BasicLayout.js";
import zhCN from "antd/lib/locale-provider/zh_CN";
// 生成div node
const Div = document.createElement("div");
Div.setAttribute("id", "root");
document.body.appendChild(Div);

class App extends React.Component {
  render() {
    return <BasicLayout />;
  }
}

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);
