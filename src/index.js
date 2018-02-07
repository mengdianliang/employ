// import './example/router_redux/App.js'
import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './pro/App.js'
import {Helmet} from 'react-helmet'


ReactDOM.render(
    <div>
        <Helmet>
            {/* <link rel="icon" href={require('./pro/resource/images/favicon.ico')} type="image/x-icon" />
            <link rel="shortcut icon" href={require('./pro/resource/images/favicon.ico')} type="image/x-icon" /> */}
            <title>BOSS直聘</title>
        </Helmet>
        <App />
    </div>,
    document.getElementById('root')
)

registerServiceWorker();