import React,{Component} from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            num: 1,
            title: '张丹'
        }
        //性能优化点(函数绑定)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickTitle = this.handleClickTitle.bind(this)
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }
    handleClickTitle() {
        this.setState({
            title: this.state.title + '!'
        })
    }
    render() {
        //每一次渲染render bind都会执行一次
        const item = '性能优化属性传递'; //这样的话每次都传递一个，而不是每次生成新的，传递的时候只传递需要的属性
        return (
            <div>
                <h2>App,{this.state.num}</h2>
                <button onClick={this.handleClick}>btnNum</button>
                <button onClick={this.handleClickTitle}>btnTitle</button>
                <Demo name={item} title={this.state.title}/>
            </div>
        )
    }
}
import React,{Component} from 'react';

class Demo extends Component {
    //父组件render发生变化，子组件一定跟着重新渲染
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.title === this.props.title) {
            return false
        }
        return true
    }
    render() {
        return (
            <div>
                I am demo，{this.props.title}
            </div>
        )
    }
}
export default App;