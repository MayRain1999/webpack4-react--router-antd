import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import routersConfig from '../../router/routersConfig';

class ContentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRoute = (config) =>
    config.map((item) => {
      if (item.childRouters && item.childRouters.length) {
        return this.renderRoute(item.childRouters);
      }
      return (
        <Route exact key={item.path} path={item.path}>
          {item.component}
        </Route>
      );
    });

  render() {
    return (
      <Switch>
        {this.renderRoute(routersConfig)}
        <Redirect exact to="/" from="/" />
      </Switch>
    );
  }
}
export default ContentBox;
