import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import SiderBar from 'components/SiderBar/SiderBar';
import ContentBox from 'components/ContentBox/ContentBox';
import { Layout, Breadcrumb } from 'antd';

import './index.css';

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
        <Layout>
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
              <ContentBox />
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
