import React from 'react';

class Chat extends React.Component {
    render() {
        console.log('chat props', this.props);
        const { match } = this.props;
        
        return (
            <div>
                chat to {match.params.user}
            </div>
        )
    }
}

export default Chat;