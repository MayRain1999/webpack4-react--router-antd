import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    NProgress.start();
  };

  componentDidMount = () => {
    NProgress.done();
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome</h1>
        <h1>查找用户</h1>
        <h1>用户权限</h1>
        <h1>用户配额</h1>
        <h1>产品信息</h1>
        <h1>机房配额</h1>
        <h1>机房权限</h1>
        <h1>后续功能开发中...</h1>
      </div>
    );
  }
}
export default Home;
