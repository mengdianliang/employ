import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Register from '../containers/register/register'
import Login from '../containers/login/login'
import BossInfo from '../containers/bossinfo/bossinfo'
import GeniusInfo from '../containers/geniusinfo/geniusinfo'
import Chat from '../containers/chat/chat'
import DashBoard from '../containers/dashboard/dashboard'

export default () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => (<Redirect to="/login" />)} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/bossinfo" component={BossInfo}/>
            <Route path="/geniusinfo" component={GeniusInfo}/>
            <Route path="/chat/:user" component={Chat}/>
            <Route component={DashBoard}/>
        </Switch>
    </div>
)