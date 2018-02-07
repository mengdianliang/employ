//import {createStore} from 'redux'; 
import {createStore} from './woniu.redux';
//1.新建store
// 通过reducer建立
//根据老的状态和action 生成新的状态
function counter(state=0, action) {
    console.log(state, action)
    switch(action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:     
            return 10;      
    }
}
const store = createStore(counter);

function listener() {
    const current = store.getState();
    console.log(`现在数据是${current}`)
}
// 订阅事件，监听器的作用
store.subscribe(listener)
//派发事件,传递action
store.dispatch({type:'increment'})
store.dispatch({type:'decrement'})
store.dispatch({type:'decrement'})
