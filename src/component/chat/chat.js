import React from 'react';
import './chat.css'
import { List, InputItem, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    state = { text: '' }
    componentDidMount() {
        const { chat, getMsgList,recvMsg } = this.props;
        const { msgs } = chat || {}
        if (!msgs ||!chat.msgs.length) {
            getMsgList();
            recvMsg()
        }
        
    }

    handleSubmit = () => {
        const { text } = this.state;
        const { user, match, sendMsg, List } = this.props;
        const { _id } = user;
        const from = _id;
        const to = match.params.user;
        const msg = text;
        sendMsg({ from, to, msg })
        this.setState({ text: '' })
    }
    render() {
        const { text } = this.state;
        const { chat, match } = this.props;
        const { chatmsg } = chat;
        const { user: userid } = match.params
        const { users } = chat;
        if (!users || !users[userid]) {
            // return null;
        }
        const userInfo = users[userid] || {};
        const { name } = userInfo || {};
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>{name}</NavBar>
                <List>
                    {chatmsg.map(item => {
                        const { _id, content, from } = item;
                        return from === userid ? (
                            <List.Item key={_id} >对方发来的:{content}</List.Item>
                        ) : (
                                <List.Item className='chat-me' key={_id} extra={'我的'} >我发的:{content}</List.Item>
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