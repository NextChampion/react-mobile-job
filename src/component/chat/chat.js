import React from 'react';
import io from 'socket.io-client'
import './chat.css'
import { List, InputItem } from 'antd-mobile';
const socket = io('ws://localhost:9093');

class Chat extends React.Component {
    state = { text: '', msg: [] }
    componentDidMount() {
        socket.on('receivemsg', s => {
            const { msg } = this.state;
            this.setState({ msg: [...msg, s] })
        })
    }

    handleSubmit = () => {

        const { text } = this.state;

        socket.emit('sendmsg', { text: text })
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