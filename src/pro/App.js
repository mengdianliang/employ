import React, {Component} from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import reducers from './redux/reducer'
import './util/config/config'
import AuthRoute from './components/authRoute/authRoute'
import RouterIndex from './router/index'

const store = createStore(reducers, compose(
    //使用中间件处理异步
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : compose
))
class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({
            hasError: true
        })
    }
    render() {
        if (this.state.hasError) {
            return (<h2>页面出错了</h2>)
        }
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <AuthRoute />
                        <RouterIndex />
                    </div>
                </BrowserRouter>
            </Provider>)
    }
}
export default App;