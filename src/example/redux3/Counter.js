import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addNum, removeNum, addNumAsync, removeNumAsync} from './index.redux';
// const mapStatetoProps = (state)=> {
//   return {num: state}
// }
// const actionCreators = {addNum, removeNum, addNumAsync, removeNumAsync}
//Counter = connect(mapStatetoProps, actionCreators)(Counter)

@connect(
  state => ({num: state}), 
  {addNum, removeNum, addNumAsync, removeNumAsync}
)
class Counter extends Component {
  render() {
    const {num, addNum, removeNum, addNumAsync, removeNumAsync} = this.props;
    return (
      <div>
        <h1>数量{num}</h1>
        <button onClick={addNum}>添加</button>
        <button onClick={removeNum}>删除</button>
        <button onClick={addNumAsync}>异步添加</button>
        <button onClick={removeNumAsync}>异步删除</button>
      </div>
    );
  }
}
export default Counter;
