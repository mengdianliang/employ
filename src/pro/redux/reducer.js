//合并所有的reducer,并返回
import {combineReducers} from 'redux'
import {user} from './userRedux/user.redux'
import {chatuser} from './chatuserRedux/chatuser.redux'
import {chat} from './chatRedux/chat.redux'
export default combineReducers({user, chatuser, chat})