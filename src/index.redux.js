
const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';
// reducer 
// 根据就得state和传递过来的action 生成新的state
export function counter(state = 10, action) {
    console.log('counter',action);
    
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return state;
    }
}

// action creator  生成不同的action
export function addGun() {
    return { type: ADD_GUN };
}

export function removeGun() {
    return { type: REMOVE_GUN };
}

export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun());
        }, 2000);
    }
}