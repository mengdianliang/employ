import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import UserInfo from '../userinfo/userinfo' 
import Msg from '../msg/msg'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../../components/navlink/navlink'
import './dashboard.css'
import {getMsgList, recvMsg} from '../../redux/chatRedux/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class DashBoard extends Component {
    
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        console.log(this.props)
        const {user, location} = this.props
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type=== 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type=== 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: UserInfo
            }
        ]
        console.log(location.pathname)
        //让动画生效，只渲染一个组件，根据当前的path决定组件  
        const page = navList.find(v=>v.path === location.pathname)  
        let pathinfo = ''
        if (!page) {
            pathinfo = `/${user.type}`
            return <Redirect to={pathinfo} />
        }
        return (
            <div>
                <NavBar mode="dark">{page.title}</NavBar>
                    <div style={{marginTop: '45px', width: '100%', overflow: 'hidden'}}>
                        <QueueAnim type='scaleX' duration={800}>
                            <Route key={page.path} path={page.path} component={page.component}/>
                        </QueueAnim>
                    </div>
                <NavLinkBar navList={navList}/>
            </div>
        )
    }
}

export default DashBoard;