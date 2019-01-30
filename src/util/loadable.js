// 加载页面
import Loadable from "react-loadable";
import React, { Component } from "react";
import { Spin } from "antd";
export const Loading = props => {
  if (props.error) {
    return <Spin tip="加载错误..." />;
  } else if (props.timedOut) {
    return <Spin tip="加载超时..." />;
  } else if (props.pastDelay) {
    return <Spin tip="Loading..." />;
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
