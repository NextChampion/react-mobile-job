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
            console.log(a);
            console.log(b);
            console.log('new Date().getTime()', new Date().getTime());
            
            const a_last = this.getList(a).create_time;
            const b_last = this.getList(b).create_time;
            console.log('a_last', a_last);
            console.log('b_last', b_last);
            console.log('b_last - a_last', b_last - a_last);
            
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
                                extra={<Badge text={unread}></Badge>}
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