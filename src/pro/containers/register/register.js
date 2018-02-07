import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/userRedux/user.redux'
import Logo from '../../components/logo/logo'
import './register.css'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'

@connect(
    state=> state.user,
    {register}
)
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        this.props.register(this.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
                        <InputItem
                            onChange={val=>this.handleChange('repeatpwd', val)}
                            type="password">确认密码</InputItem>
                        <Radio.RadioItem 
                            checked={this.state.type==='genius'}
                            onChange={val=>this.handleChange('type', 'genius')}
                            >牛人</Radio.RadioItem>
                        <Radio.RadioItem
                            checked={this.state.type==='boss'}
                            onChange={val=>this.handleChange('type', 'boss')}
                        >Boss</Radio.RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;