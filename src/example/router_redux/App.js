import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Author from './Author';
import Dashboard from './Dashboard';
import reducers from './reducers';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
const store = createStore(reducers, compose(
    // 使用处理异步的中间件
    applyMiddleware(thunk),
    // 调试工具的配置
    window.devToolsExtension ? window.devToolsExtension() : compose
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            {/* <Switch>  只渲染一个 */}  
            <div>
                <Switch>
                    <Route path='/login' component={Author}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to="/dashboard"/>
                </Switch>  
            </div>
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root')
);