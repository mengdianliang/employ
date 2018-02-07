import React,{Component} from 'react';
import './logo.css';
import logoImg from './job.jpg';
class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt="logo"/>
            </div>
        )
    }
}

export default Logo;