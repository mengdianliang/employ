import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chatRedux/chat.redux'
import {InputItem, NavBar, List, Icon, Grid} from 'antd-mobile'
import './chat.css'
import {getChatId} from '../../util/getChatId/getChatId'
import QueueAnim from 'rc-queue-anim'
@connect(
    state=>state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: [],
            showEmoji: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fixCarousel = this.fixCarousel.bind(this)
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    // 修复antd-mobile中九宫格不出现的问题
    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit() {
        let {text} = this.state
        if(text.trim() !== ''){
            //通过事件把信息发送到后端
            // socket.emit('sendmsg', {text})
            const from = this.props.user._id
            const to = this.props.match.params.user
            const msg = this.state.text
            this.props.sendMsg({from, to, msg})
            this.setState({
                text: ''
            })
        }  
    }
    render() {
        //console.log(this.props)
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if(!users[userid]) {
            return null
        }
        const emoji = '😄  😃  😊  😉  😍  😘  😚  😜  😝  😳  😁  😔  😌  😒  😞  😣  😢 😂  😭  😪  😥  😰  😅  😓  😩  😫  😨  😱 😠  😡  😤  😖  😆  😋  😷  😎  😵  😲  😈  👿  😐  😶 😇  😏  😺  😸  😻  😽  😼  🙀  😿  😹 😾  👹 👑  🔥  ✨  🌟  💫  💥  🎀  🌂  💄  💛  💙 💜  💚  ❤  💔  💗  💓  💕  💖  💞  💘  💌 💋  🎍  💝  🎎  🎒  🎓  🎏  🎆  🎇  🎐  🎑 🎃  👻  🎅  🎄  🎁  🎋  🎉  🎊  🎈  🎌 '
        .split(' ').filter(v=>v).map(v=>({text:v}))
        const chatid = getChatId(userid, this.props.user._id)
        
        // 获取只属于两个人之间的聊天信息
        const chatmsgs = this.props.chat.chatmsg.filter(v=> v.chatid === chatid)
        // console.log(this.props.chat.chatmsg)
        // console.log(chatmsgs)
        return (
            <div id="chat-page">
                <NavBar 
                    mode="dark" 
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{
                        this.props.history.goBack(-1)
                    }}
                    >
                    {users[userid].name}
                </NavBar>
                <QueueAnim delay={100}>
                    {chatmsgs.map(v=>{
                        const avatar = require(`../../resource/images/${users[v.from].avatar}.png`)
                        return v.from === userid ? (
                            <List key={v._id}>
                                <List.Item
                                    thumb={avatar}
                                >{v.content}</List.Item>
                            </List>
                        ): (
                            <List key={v._id}>
                                <List.Item 
                                    extra={<img src={avatar} alt=""/>}
                                className='chat-me'
                                >{v.content}</List.Item>
                            </List>
                        )
                    })}
                </QueueAnim>    
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入消息"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15,color: '#00ff00'}}
                                        onClick={()=>{
                                            let {showEmoji} = this.state
                                            this.setState({
                                                showEmoji: !showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😄</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    />:null}
                </div>
            </div>
        )
    }
}

export default Chat;