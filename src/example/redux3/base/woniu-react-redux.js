// react- redux
// connect：负责连接组件，给到redux里的数据放到组件的属性里
    //1. 负责接收一个组件，把state里的一些数据放进去，返回一个组件
    //2. 数据变化时，能够通知组件
//Provider，把store放到context里，所有子元素可以直接取到store
import React from 'react'
import PropTypes from 'prop-types'


// export function connect (mapStateToProps, mapDispatchToProps) {
//     return  function (WrapComponent) {
//         return class ConnectComponent extends React.Component{}
//     }
// }
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => {
    
}

class Provider extends React.Component{
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return {store: this.store}
    }
    constructor(props, context) {
        super(props, context)
        this.store = props.store //????
    }
    render() {
        return this.props.children
    }
}