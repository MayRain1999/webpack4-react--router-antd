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

  componentDidMount() {}

  renderSiderbar = (config) =>
    config.map((item) => {
      if (item.childRouters && item.childRouters.length) {
        return (
          <SubMenu
            key={item.name}
            title={
              <span>
                {item.icon}
                {item.name}
              </span>
            }
          >
            {this.renderSiderbar(item.childRouters)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <NavLink to={item.path}>
            {item.icon}
            {item.name}
          </NavLink>
        </Menu.Item>
      );
    });

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
    const { location } = this.props;
    return (
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{
          minHeight: '100vh',
        }}
      >
        <Switch
          checkedChildren="浅色"
          unCheckedChildren="深色"
          onChange={this.changnTheme}
        />
        <Menu theme={theme} mode="inline" selectedKeys={[location.pathname]}>
          {this.renderSiderbar(routersConfig)}
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(SiderBar);
