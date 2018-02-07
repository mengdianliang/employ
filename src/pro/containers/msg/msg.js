import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import './msg.css'

@connect(
    state=>state
)
class Msg extends Component {
    constructor(props){
        super(props);
        this.getLast = this.getLast.bind(this);
    }
    componentDidMount() {
    // ....
    }
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        // console.log(this.props)

        if(!this.props.chat.chatmsg.length) {
            return <div className="no-result">还没有任何消息</div>
        }
        //根据不同用户（chatid）分组
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)

        //根据最新消息排序
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })

        const userid = this.props.user._id

        const Item = List.Item
		const Brief = Item.Brief
        return (
            <div>
                <List>
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        // 根据最后一条信息是谁发的来判断
                        const targetId = v[0].from === userid ? v[0].to : v[0].from
                        const unreadNum = v.filter(item=>!item.read && item.to===userid).length
                        // console.log(unreadNum)
                        if(!this.props.chat.users[targetId]) {
                            return null
                        }
                        return (
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                key={lastItem._id}
                                thumb={require(`../../resource/images/${this.props.chat.users[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                        >
                            {lastItem.content}
                            <Brief>{this.props.chat.users[targetId].name}</Brief>
                        </Item>
                        )
                     })}
                </List>
            </div>
        )
    }
}

export default Msg;