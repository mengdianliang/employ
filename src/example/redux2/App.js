import React, { Component } from 'react';
class App extends Component {
  render() {
    const {store, addNum, removeNum} = this.props;
    const num = store.getState()
    return (
      <div>
        <h1>数量{num}</h1>
        <button onClick={()=>store.dispatch(addNum())}>添加</button>
        <button onClick={()=>store.dispatch(removeNum())}>删除</button>
      </div>
    );
  }
}

export default App;
