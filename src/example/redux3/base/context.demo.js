import React from 'react'
import PropsTypes from 'prop-types'
// context是全局的，组件里声明，所有子元素可以直接获取
class Sidebar extends React.Component{
    render() {
        return (
            <div>
                <p>侧边栏</p>
                <Navbar/>
            </div>
        )
    }
}
class Navbar extends React.Component{
    static contextTypes = {
        user: PropTypes.string
    }
    render(){
        console.log(this.context)
        return (
            <div>{this.context.user}的导航栏</div>
        )
    }
}
/*无状态函数
    function Navbar(props, context)
*/
class Page extends React.Component{
    static childContextTypes = {
        user: PropTypes.string
    }
    constructor(){
        super(props)
        this.state = {user: '蜗牛'}
    }
    getChildContext() {
        return this.state
    }
    render() {
        return (
            <div>
                <p>我是{this.state.user}</p>
                <Sidebar/>
            </div>
        )
    }
}

export default Page