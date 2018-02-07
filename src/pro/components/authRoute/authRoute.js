import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {loadData} from '../../redux/userRedux/user.redux';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends Component {
    componentDidMount() {
        const pathList = ['/login', 'register']
        const pathname = this.props.location.pathname
        if(pathList.indexOf(pathname) > -1) {
            return null;
        }
        // 获取用户信息
        axios.get('/user/info')
        .then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            }
        })
        // 情况：
        // (1) 是否登录
        // (2) 现在的url地址
        // (3) 用户的身份
        // (4) 用户是否完善信息
    }

    render() {
        return null
    }
}

export default AuthRoute;