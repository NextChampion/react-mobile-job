import React from 'react';
import './chat.css'
import { List, InputItem } from 'antd-mobile';
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { getMsgList, sendMsg } from '../../redux/chat.redux';
const socket = io('ws://localhost:9093');

@connect(
    state => state,
    { getMsgList, sendMsg }
)
class Chat extends React.Component {
    state = { text: '', msg: [] }
    componentDidMount() {
        const { getMsgList } = this.props;
        getMsgList();
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
        const { match } = this.props;
        const { text, msg } = this.state;
        return (
            <div>
                {msg.map(item => {
                    return <p key={item.text}>{item.text}</p>
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