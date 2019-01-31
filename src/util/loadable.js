// 加载页面
import Loadable from "react-loadable";
import React, { Component } from "react";
import { Spin, Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antLong = (
  <Icon type="loading" style={{ fontSize: 24, color: "red" }} spin />
);
const antError = (
  <Icon type="loading" style={{ fontSize: 24, color: "red" }} spin />
);

export const Loading = props => {
  if (props.error) {
    return (
      <Spin
        size="large"
        tip="加载错误 。。。"
        indicator={antError}
        style={{ position: "absolute", color: "red",top:"40%",left:"50%" }}
      />
    );
  } else if (props.timedOut) {
    return (
      <Spin
        size="large"
        tip="加载超时 。。。"
        indicator={antLong}
        style={{ textAlign: "center", color: "red" }}
      />
    );
  } else if (props.pastDelay) {
    return (
      <Spin
        size="large"
        tip="Loading 。。。"
        indicator={antError}
        style={{ color: "red" }}
      />
    );
  } else {
    return null;
  }
};
export const importPath = ({ loader }) => {
  return Loadable({
    loader,
    loading: Loading,
    delay: 200,
    timeout: 10000
  });
};
