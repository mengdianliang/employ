import React,{Component} from 'react'
import {Grid, List} from 'antd-mobile'
import './avatarselector.css'
import PropsTypes from 'prop-types'
class AvatarSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',').map(val =>({
            icon: require(`../../resource/images/${val}.png`),
            text: val
        }))
        const gridHeader = this.state.icon ? (<div>
            <span>已选择头像&nbsp;</span>
            <img style={{height: 20}} src={this.state.icon} alt=""/>
        </div>) : '请选择头像'
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} 
                        columnNum={5} 
                        itemStyle={{backgroundColor: '#ffff00' }} 
                        onClick={el=>{
                                this.setState(el)
                                this.props.avatarSelect(el.text)
                            }}
                    />
                </List>
            </div>
        )
    }
}
AvatarSelector.propTypes = {
    avatarSelect: PropsTypes.func.isRequired
}
export default AvatarSelector;