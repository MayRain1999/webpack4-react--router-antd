import React from "react";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { routers } from "../../router/Router.js";
// 具体导航的名称
class Bread extends React.Component {
  // 利用PropTypes记住所跳转每个页面的位置
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pathSnippets: null,
      extraBreadcrumbItems: null
    };
  }

  getPath() {
    // 对路径进行切分，存放到this.state.pathSnippets中
    this.state.pathSnippets = this.context.router.history.location.pathname
      .split("/")
      .filter(i => i);
    // 将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
    this.state.extraBreadcrumbItems = this.state.pathSnippets.map(
      (_, index) => {
        const url = `/${this.state.pathSnippets.slice(0, index + 1).join("/")}`;
        let temp = "";
        for (let item of routers) {
          if (url == item.path) {
            temp = item;
          }
        }
        return (
          <Breadcrumb.Item key={url}>
            <Icon type="temp.icon" />
            <span>{temp.name}</span>
          </Breadcrumb.Item>
        );
      }
    );
  }

  componentWillMount() {
    this.getPath();
  }

  componentWillReceiveProps() {
    this.getPath();
  }

  render() {
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">
          <Icon type="home" />
          <span>Home</span>
        </Link>
      </Breadcrumb.Item>
    ].concat(this.state.extraBreadcrumbItems);
    return (
      <span>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </span>
    );
  }
}
export default Bread;
