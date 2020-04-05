import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import SiderBar from 'components/SiderBar/SiderBar';
import { Layout, Breadcrumb } from 'antd';

import './index.css';
import routersConfig from './router/routersConfig';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(routersConfig);
  }

  render() {
    return (
      <BrowserRouter>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <SiderBar />

          <Layout className="site-layout">
            <Header className="site-layout-background" />
            <Content
              style={{
                margin: '0 16px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
                }}
              >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                {routersConfig.map((item) => (
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

const divNode = document.createElement('div');
divNode.id = 'app';

document.body.appendChild(divNode);

ReactDOM.render(<App />, document.getElementById('app'));
