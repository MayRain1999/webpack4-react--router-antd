import React from "react";
import { hashHistory } from "react-router";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SiderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleClick = e => {
  //   // // console.log(e,'---');
  //   // let path='';
  //   // e.keyPath.reverse();
  //   // for(var i=0;i<e.keyPath.length;i++){
  //   //   path+=e.keyPath[i];
  //   // }
  //   // hashHistory.push(path)
  // };

  render() {
    const { router } = this.props;
    return (
      <Menu
        // onClick={this.handleClick}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {router.map((value, index) => {
          if (value.childRouter && value.childRouter.length > 0) {
            return (
              <SubMenu
                key={value.key}
                title={
                  <span>
                    <span>{value.name}</span>
                  </span>
                }
              >
                {value.childRouter.map((item, i) => {
                  return (
                    <Menu.Item key={item.path}>
                      <Link to={`${value.path}${item.path}`}>{item.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={value.path}>
                <Link to={value.path}>{value.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}
}
export default SiderBar;
