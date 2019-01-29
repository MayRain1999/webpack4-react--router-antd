import axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 拦截所有有请求与回复
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    message.error("请求错误，请重试");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data.RetCode === 101) {
      message.error(response.data.Message);
      return response;
    }
    if (response.data.RetCode === 100) {
      message.error(response.data.Message);
      return response;
    }
    return response;
  },
  error => {
    message.error("请求错误，请重试");
    NProgress.done();
    return Promise.reject(error);
  }
);
export default request;
