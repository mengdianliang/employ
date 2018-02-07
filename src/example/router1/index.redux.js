//reducer
const ADD_NUM = 'increment';
const REMOVE_NUM = 'decreament';
export function counter(state=0, action) {
    switch(action.type) {
        case ADD_NUM:
            return state + 1;
        case REMOVE_NUM:
            return state - 1;
        default:     
            return 10;      
    }
}

export function addNum() {
    return {type: ADD_NUM}
}
export function removeNum() {
    return {type: REMOVE_NUM}
}
export function addNumAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addNum());
        }, 2000);
    };
}
export function removeNumAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(removeNum());
        }, 2000);
    };
}