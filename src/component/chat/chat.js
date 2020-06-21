import React from 'react';
import './chat.css'
import { List, InputItem } from 'antd-mobile';
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    state = { text: '' }
    componentDidMount() {
        const { getMsgList, recvMsg } = this.props;
        getMsgList();
        recvMsg()
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
    render() {
        const { text } = this.state;
        const { chat } = this.props;
        const { chatmsg } = chat;
        return (
            <div>
                {chatmsg.map(item => {
                    const { _id, content } = item;
                    return <p key={_id}>{content}</p>
                })}
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