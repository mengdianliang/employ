import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuserRedux/chatuser.redux'
import UserCard from '../../components/usercard/usercard'

@connect(
	state=>state.chatuser,
	{getUserList}
)
class Boss extends Component {
    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return (
            <div>
                <UserCard userlist={this.props.userlist} />
            </div>
        )
    }
}

export default Boss;