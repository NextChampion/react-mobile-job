/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2020-06-21 23:08:54
 * @LastEditTime: 2020-06-23 22:41:20
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
                unread: payload.msgs.filter(v => !v.read).length,
            }
        }
        case MSG_RECV: {
            const { payload } = action;
            return { ...state, chatmsg: [...state.chatmsg, payload], unread: state.unread + 1 }
        }
        case MSG_READ:

            break;

        default:
            return state;
    }
}

function msgList(msgs, users) {
    return { type: MSG_LIST, payload: {msgs, users} }
}

function msgRecv(msg) {
    return { type: MSG_RECV, payload: msg }
}

export function getMsgList() {
    return dispatch => {
        Axios.get('/user/getmsglist')
            .then(res => {
                console.log('res=====', res.data.msgs.length);
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs, res.data.users))
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
    return dispatch => {
        socket.on('recvmsg', msg => {
            dispatch(msgRecv(msg))
        })
    }
}