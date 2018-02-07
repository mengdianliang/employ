import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/userRedux/user.redux'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import './login.css'
@connect(
    state=> state.user,
    {login}
)
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    //注册路由跳转
    register() {
        this.props.history.push('/register');
    }
    //输入框选项
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    // 登录提交
    handleLogin() {
        this.props.login(this.state)
    }
    render() {
        if (this.props.type) {
            const userinfo = `/${this.props.type}`
            return <Redirect to={userinfo} />
        }
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={val=>this.handleChange('user', val)}
                        >用户名</InputItem>
                        <InputItem
                            onChange={val=>this.handleChange('pwd', val)}
                            type="password">密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;