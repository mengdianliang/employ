import React,{Component} from 'react';
import{connect} from 'react-redux';
import {login, getUserData} from './Auth.redux';
import {Redirect} from 'react-router-dom';
//合并reducers
@connect(
    state=>state.auth,
    {login, getUserData}
)
class Author extends Component {
    componentDidMount() {
        this.props.getUserData();
    }
   render() {
    console.log(this.props);
       return (
           <div>
               <h2>我的名字是：{this.props.user},年龄{this.props.age}</h2>
               {this.props.isAuth ? <Redirect to="/dashboard"/> : null}
              <h2>你还没有权限，需要登录才能看</h2> 
              <button onClick={this.props.login}>登录</button>
           </div>
       )
   }
}

export default Author;