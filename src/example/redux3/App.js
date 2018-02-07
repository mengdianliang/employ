import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Counter from './Counter';
import {counter} from './index.redux';
const store = createStore(counter, compose(
    // 使用处理异步的中间件,开启thunk
    applyMiddleware(thunk),
    // 调试工具的配置
    window.devToolsExtension ? window.devToolsExtension() : compose
  ));

ReactDOM.render(
    (<Provider store={store}>
        <Counter/>
    </Provider>), 
    document.getElementById('root')
);