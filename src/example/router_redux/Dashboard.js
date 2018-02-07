import React,{Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './Auth.redux';
import Counter from './Counter';

function About() {
    return (<h2>关于我的近况</h2>)
}

function Info() {
    return (<h2>我的经历</h2>)
}

@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends Component {

   render() {
       const {match} = this.props;
       console.log(match.url)
       const redirectToLogin = <Redirect to="/login"></Redirect>
       const logInfo = (
        <div>
           <button onClick={this.props.logout}>注销</button>
            <ul>
                <li>
                    <Link to={`${match.url}`}>计数</Link>
                </li>
                <li>
                    <Link to={`${match.url}/about`}>关于</Link>
                </li>
                <li>
                    <Link to={`${match.url}/info`}>信息</Link>
                </li>
            </ul>
            <Route exact path={`${match.url}`} component={Counter}></Route>
            <Route path={`${match.url}/about`} component={About}></Route>
            <Route path={`${match.url}/info`} component={Info}></Route>
        </div>
       )
       return this.props.isAuth ? logInfo : redirectToLogin;
   }
}

export default Dashboard;