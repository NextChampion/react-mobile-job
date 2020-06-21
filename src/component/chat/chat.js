import React from 'react';
import io from 'socket.io-client'
import './chat.css'
class Chat extends React.Component {
    componentDidMount() {
        console.log('发起链接');
        const socket = io('ws://localhost:9093');
        console.log(socket);

    }
    render() {
        const { match } = this.props;

        return (
            <div>
                chat to {match.params.user}
            </div>
        )
    }
}

export default Chat;