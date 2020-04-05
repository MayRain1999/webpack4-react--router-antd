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
    showSiderbar: true,
  },
  {
    path: '/pageone',
    name: 'pageone',
    icon: <SolutionOutlined />,
    component: () => <Pageone />,
    showSiderbar: true,
  },
  {
    path: '/pagetwo',
    name: 'pagetwo',
    icon: <SolutionOutlined />,
    showSiderbar: true,
    childRouters: [
      {
        path: '/pagetwo',
        name: 'pagetwo',
        icon: <SolutionOutlined />,
        component: () => <Pageone />,
        showSiderbar: true,
      },
      {
        path: '/pagethree',
        name: 'pagethree',
        icon: <SolutionOutlined />,
        component: () => <Pageone />,
        showSiderbar: true,
      },
    ],
  },
];

export default routersConfig;
