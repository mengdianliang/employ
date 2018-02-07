import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/userRedux/user.redux'
import AvatarSelector from '../../components/avatarselector/avatarselector'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'

@connect(
    state=> state.user,
    {update}
)
class GeniusInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.avatarSelect = this.avatarSelect.bind(this)
    }
    // 文本框选项
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    // 头像选择
    avatarSelect(text) {
        this.setState({
            avatar: text
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        // console.log(redirect)
        return (
            <div>
                {redirect&&redirect!==path ? <Redirect to={redirect}></Redirect> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector
                    avatarSelect={this.avatarSelect}
                ></AvatarSelector>
                <InputItem
                    onChange={val => this.handleChange('title', val)}
                >求职岗位</InputItem>
                <TextareaItem
                    onChange={val => this.handleChange('desc', val)}
                    rows={3}
                    autoHeight
                    title="个人简介"
                    />
                <Button onClick={()=>this.props.update(this.state)}
                        type="primary"
                >保存</Button>    
            </div>
        )
    }
}

export default GeniusInfo;