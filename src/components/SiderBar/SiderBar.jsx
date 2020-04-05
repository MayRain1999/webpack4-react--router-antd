import React, { Component } from 'react';
import { Menu, Layout, Switch } from 'antd';
import { withRouter, NavLink } from 'react-router-dom';
import routersConfig from '../../router/routersConfig';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      collapsed: false,
    };
  }

  renderSiderbar = () => {
    routersConfig.map((item) => (
      <Menu.Item key={item.path}>
        <NavLink to={item.path}>
          {item.icon}
          {item.name}
        </NavLink>
      </Menu.Item>
    ));
  };

  changnTheme = () => {
    const { theme } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };

  render() {
    const { theme, collapsed } = this.state;
    return (
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <Switch
          checkedChildren="深色"
          unCheckedChildren="浅色"
          onChange={this.changnTheme}
        />
        <Menu>{this.renderSiderbar()}</Menu>
      </Sider>
    );
  }
}
export default withRouter(SiderBar);
