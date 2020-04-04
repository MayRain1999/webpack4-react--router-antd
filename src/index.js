import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import { Layout, Breadcrumb, Menu } from "antd";
import "./index.css";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
import Home from "pages/Home/Home";
import Pageone from "pages/Pageone/Pageone";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { collapsed } = this.state;
    // const pathName = BrowserRouter.getCurrentLocation().pathname;
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div style={{ height: 64 }}></div>
            <Menu theme="dark">
              <Menu.Item>
                <NavLink to="/">首页</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/pageone">页面一</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Route path="/" component={Home} />
                <Route path="/pageone" component={Pageone} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

const divNode = document.createElement("div");
divNode.id = "app";

document.body.appendChild(divNode);

ReactDOM.render(<App></App>, document.getElementById("app"));
