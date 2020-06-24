/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2020-06-21 23:08:54
 * @LastEditTime: 2020-06-24 23:13:30
 * @LastEditors: zhangcunxia
 * @Description:
 */
import io from 'socket.io-client'
import Axios from 'axios';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';// 获取聊天列表
const MSG_RECV = 'MSG_RECV'; // 读取消息
const MSG_READ = 'MSG_READ'; // 标记已读

const initState = {
    chatmsg: [],
    users: {},
    unread: 0,
}

export default function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST: {
            const { payload } = action;
            return {
                ...state,
                chatmsg: payload.msgs,
                users: payload.users,
                unread: payload.msgs.filter(v => !v.read && v.to ===payload.userid).length,
            }
        }
        case MSG_RECV: {
            const { payload } = action;
            const n = payload.msg.to === payload.userid ? 1 : 0;
            return { ...state, chatmsg: [...state.chatmsg, payload.msg], unread: state.unread + n }
        }
        case MSG_READ:

            break;

        default:
            return state;
    }
}

function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: {msgs, users, userid} }
}

function msgRecv(msg, userid) {
    return { type: MSG_RECV, payload: {msg, userid} }
}

export function getMsgList() {
    return (dispatch, getState) => {
        Axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log('ssss', getState());
                    const { user } = getState() || {};
                    const userid = user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', msg => {
            const { user } = getState() || {};
            const userid = user._id;
            dispatch(msgRecv(msg, userid))
        })
    }
}