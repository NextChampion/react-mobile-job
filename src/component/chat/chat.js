import React from 'react';
import './chat.css'
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    state = { text: '' }
    componentDidMount() {
        const { chat, getMsgList,recvMsg } = this.props;
        const { chatmsg } = chat || {}
        if (!chatmsg ||!chatmsg.length) {
            getMsgList();
            recvMsg()
        }
        
    }

    handleSubmit = () => {
        const { text } = this.state;
        const { user, match, sendMsg } = this.props;
        const { _id } = user;
        const from = _id;
        const to = match.params.user;
        const msg = text;
        sendMsg({ from, to, msg })
        this.setState({ text: '' })
    }

    onLeftClick = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { text } = this.state;
        const { chat, match, user } = this.props;
        const { chatmsg } = chat;
        const { user: userid } = match.params
        const { users } = chat;
        if (!users || !users[userid]) {
            return null;
        }
        const userInfo = users[userid] || {};
        const { name } = userInfo || {};
        const chatId = getChatId(userid, user._id);
        const currentMsg = chatmsg.filter(v => v.chatid ===chatId)
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    leftContent={<Icon type='left' />}
                    onLeftClick={this.onLeftClick}
                >
                    {name}
                </NavBar>
                <List>
                    {currentMsg.map(item => {
                        const { _id, content, from } = item;
                        const fromInfo = users[from] || {};
                        const { avatar } = fromInfo || {};
                        const avatarIcon = require(`../images/${avatar}`);

                        return from === userid ? (
                            <List.Item
                                key={_id}
                                thumb={avatarIcon} >
                                {content}
                            </List.Item>
                        ) : (
                                <List.Item
                                    className='chat-me'
                                    key={_id}
                                    extra={<img src={avatarIcon} alt='' />}
                                >
                                    我发的:{content}
                                </List.Item>
                            )
                    })}
                </List>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        >
                            信息
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;