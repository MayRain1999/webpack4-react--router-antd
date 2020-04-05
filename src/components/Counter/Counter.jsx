import React, { Component } from 'react';
import style from './Counter.css';
import { Button } from 'antd';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  countNum() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <p className={style.pext}>{count}</p>
        <p>
          <Button className={style.btn} onClick={this.countNum.bind(this)}>
            更新计数
          </Button>
        </p>
      </div>
    );
  }
}
export default Counter;
