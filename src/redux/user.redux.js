import axios from "axios";
import { getRedirectPath } from '../util';

const ERROR_MESSAGE = 'ERROR_MESSAGE';
const LOADED_USERINFO = 'LOADED_USERINFO';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT'

const initialState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: '',
    avatar: '',
}

export function user(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload };
        case ERROR_MESSAGE:
            return { ...state, isAuth: false, msg: action.msg };
        case LOADED_USERINFO:
            return { ...state, ...action.payload };
        case LOGOUT:
            return { ...initialState, redirectTo: '/login' };
        default:
            return state;
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MESSAGE };
}

function authSuccess(payload) {
    return { payload, type: AUTH_SUCCESS };
}

export function loadedUserinfo(userinfo) {
    return { type: LOADED_USERINFO, payload: userinfo };
}

export function register({ user, pwd, repeatPwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名或者密码不能为空');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('两次输入的密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(res => {
            if (res.status !== 200) {
                dispatch(errorMsg('网络请求失败'))
                return;
            }
            const { data } = res;
            const { code, message } = data;
            if (code === 1) {
                dispatch(errorMsg(message || '服务器处理请求失败'))
                return;
            }
            dispatch(authSuccess({ user, pwd, type }));
        })
    }
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户名或者密码不能为空');
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(res => {
            if (res.status !== 200) {
                dispatch(errorMsg('网络请求失败'))
                return;
            }
            const { data } = res;
            const { code, message, data: resData } = data;
            if (code === 1) {
                dispatch(errorMsg(message || '服务器处理请求失败'))
                return;
            }
            dispatch(authSuccess(resData))
        })
    }
}

export function update(data) {
    console.log('update', data);
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if (res.status !== 200) {
                dispatch(errorMsg('网络请求失败'))
                return;
            }
            const { data } = res;
            const { code, message, data: resData } = data;
            if (code === 1) {
                dispatch(errorMsg(message || '服务器处理请求失败'))
                return;
            }
            dispatch(authSuccess(resData))
        })
    }
}

export function logoutSubmit(params) {
    return { type: LOGOUT }
}