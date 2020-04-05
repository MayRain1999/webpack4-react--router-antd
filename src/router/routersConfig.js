import React from 'react';
import Home from 'pages/Home/Home';
import Pageone from 'pages/Pageone/Pageone';
import { SolutionOutlined, AndroidOutlined } from '@ant-design/icons';

const routersConfig = [
  {
    path: '/',
    name: '首页',
    icon: <AndroidOutlined />,
    component: () => <Home />,
  },
  {
    path: '/pageone',
    name: 'pageone',
    icon: <SolutionOutlined />,
    component: () => <Pageone />,
  },
];

export default routersConfig;
