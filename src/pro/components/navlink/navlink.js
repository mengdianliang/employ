import React,{Component} from 'react'
import {withRouter} from  'react-router-dom'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import './navlink.css'
import {connect} from 'react-redux'
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends Component {

    render() {
        let navList = this.props.navList.filter(v => !v.hide)
        const {pathname} = this.props.location
        // console.log(navList)
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            badge={v.path==='/msg' ? this.props.unread : 0}
                            icon={{uri: require(`./images/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        ></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}
NavLinkBar.propTypes = {
    navList: PropTypes.array.isRequired
}
export default NavLinkBar;