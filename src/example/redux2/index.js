import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import App from './App';
import {counter, addNum, removeNum} from './index.redux';
import Demo from './demo'
const store = createStore(counter);

ReactDOM.render(
    <Demo></Demo>,
    document.getElementById('root')
)
// function render() {
//     ReactDOM.render(
//     <App store={store} 
//          addNum={addNum} 
//          removeNum={removeNum}/>, 
//     document.getElementById('root'));
// }
// render();
// store.subscribe(render);