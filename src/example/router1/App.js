import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

import Counter from './Counter';
import {counter} from './index.redux';
const store = createStore(counter, compose(
    // 使用处理异步的中间件
    applyMiddleware(thunk),
    // 调试工具的配置
    window.devToolsExtension ? window.devToolsExtension() : compose
));

function About() {
    return (<h2>关于我的近况</h2>)
}

function Info() {
    return (<h2>我的经历</h2>)
}

class Test extends Component{
    render() {
        console.log(this.props);
        //this.props.history.push('/')
        return <h2>测试组件{this.props.location.pathname}</h2>;
    }
}
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">计数</Link>
                    </li>
                    <li>
                        <Link to="/about">关于</Link>
                    </li>
                    <li>
                        <Link to="/info">信息</Link>
                    </li>
                </ul>
                {/* <Switch>  只渲染匹配到的第一个 */}
                <Switch>
                    <Route exact path='/' component={Counter}></Route>
                    {/* <Route path='/:location' component={Test}></Route> */}
                    <Route path='/about' component={About}></Route>
                    <Route path='/info' component={Info}></Route>
                    <Route to="/:location" component={Test}></Route>
                </Switch>    
            </div>
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root')
);