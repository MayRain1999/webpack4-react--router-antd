import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import SiderBar from "../components/SiderBar/SiderBar.js";
import { HashRouter, Switch, Route } from "react-router-dom";
import Bread from "../components/Bread/Bread.js";

import routers from "../router/Router.js";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const PageFooter = ({ footText, style }) => {
  return <Footer style={style}>{footText}</Footer>;
};

class BasicLayout extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <HashRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            theme="dark"
          >
            <div
              style={{
                height: "32px",
                background: "rgba(255, 255, 255, 0.2)",
                margin: "16px",
                textAlign: "center",
                lineHeight: "32px"
              }}
            >
              <span>Pareto</span>
            </div>
            <SiderBar router={routers} />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <div style={{ padding:16,paddingBottom:0 }}>
              <Bread />
            </div>
            <Content
              style={{
                margin: "16px",
                background: "#fff"
              }}
            >
              <Switch>
                {routers.map(({ component, path, exact }, index) => {
                  return (
                    <Route
                      exact={true}
                      path={path}
                      component={component}
                      key={path}
                    />
                  );
                })}
              </Switch>
            </Content>
            <PageFooter
              style={{ textAlign: "center" }}
              footText=" Copyright © 2012-2019 UCloud 上海优刻得信息科技有限公司@基础产品部"
            />
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}
export default BasicLayout;
