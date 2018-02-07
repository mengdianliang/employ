import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from  'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
@withRouter
class UserCard extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(item) {
        this.props.history.push(`/chat/${item._id}`)
    }

    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace />
                    {this.props.userlist.map(v=>(
                        v.avatar ? 
                        <Card 
                            onClick={()=>this.handleClick(v)}
                            key={v._id}>
                            <Card.Header
                                key={v._id}
                                title={v.user}
                                thumb={require(`../../resource/images/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            ></Card.Header>
                            <Card.Body>
                                {v.type==='boss'? <div>公司:{v.company}</div> :null}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type==='boss'? <div>薪资:{v.money}</div> :null}</Card.Body>
                        </Card> : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}
UserCard.propTypes = {
    userlist: PropTypes.array.isRequired
}
export default UserCard;