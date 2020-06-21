import React from 'react';

class Chat extends React.Component {
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