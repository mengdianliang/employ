import React,{Component} from 'react';

class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            num: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.num%5===0) {
            return true
        }
        return false
    }
    render() {
        return (
            <div>
                <p>{this.state.num}</p>
                <button onClick={this.handleClick}>点击</button>
            </div>
        )
    }
}

export default Demo;