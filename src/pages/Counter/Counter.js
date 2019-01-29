import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '../../redux/actions/counter';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <div>
          当前计数为
          {this.props.counter.count}
        </div>
        <button onClick={() => this.props.increment()}>自增</button>
        <button onClick={() => this.props.decrement()}>自减</button>
        <button onClick={() => this.props.reset()}>重置</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    counter: state.counter,
  }),
  { increment, decrement, reset },
)(Counter);
