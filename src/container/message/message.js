import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem';

@connect(
    state => state
)
class Message extends React.Component {
    getList = (arr) => {
        return arr[arr.length -1]
    }

    onMsgClick = (targetId) => {
        const { history } = this.props;
        history.push(`/chat/${targetId}`)
    }
    
    render() {
        const msgGroup = {};
        const { chat , user} = this.props;
        const { chatmsg, users } = chat || {};
        const { _id: mineId } = user || {};
        let chatList = []
        if (!chatmsg || !chatmsg.length) {
            chatList = []
        }
        chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getList(a).create_time;
            const b_last = this.getList(b).create_time;
            return b_last - a_last;
         });
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const last = this.getList(v);
                        const { content, to,from } = last || {};
                        const targetId = mineId === to ? from : to;
                        const unread = v.filter(v => !v.read && v.to ===mineId).length
                        const targetUserInfo = users[targetId] || {};
                        if (!targetUserInfo) {
                            return null;
                        }
                        const { name, avatar } = targetUserInfo || {};
                        const icon = require(`../../component/images/${avatar || 'h00001.png'}`);
                       return (
                           <List.Item
                                key={last._id}
                                thumb={icon}
                                arrow="horizontal"
                               extra={<Badge text={unread}></Badge>}
                               onClick={() =>this.onMsgClick(targetId)}
                           >
                               {content}
                               <Brief>{name|| '对方的名字'}</Brief>
                           </List.Item>)
                   })}
                 </List>
            </div>
        )
    }
}

export default Message;