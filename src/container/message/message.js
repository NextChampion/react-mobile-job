import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
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
         chatList = Object.values(msgGroup);
        return (
            <div>
                Message
                <List>
                    {chatList.map(v => {
                        const last = this.getList(v);
                        const { content, to,from } = last || {};
                        const targetId = mineId === to ? from : to;
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