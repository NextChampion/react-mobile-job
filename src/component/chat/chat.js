import React from 'react';
import './chat.css'
import { List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    state = { text: '' , showEmoji: false}
    componentDidMount() {
        const { chat, getMsgList,recvMsg, readMsg, match } = this.props;
        const { chatmsg } = chat || {}
        if (!chatmsg ||!chatmsg.length) {
            getMsgList();
            recvMsg()
        }
        const { params } = match || {};
        const { user } = params || {};
        readMsg && readMsg(user);
    }

    componentWillUnmount() {
        const { readMsg, match } = this.props;
        const { params } = match || {};
        const { user } = params || {};
        readMsg && readMsg(user);
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

    fixCarousel = () => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));   
        });
    }

    onEmojiClick = () => {
        const { showEmoji } = this.state;
        this.setState({ showEmoji: !showEmoji })
            this.fixCarousel();
    }

    onGridClick = (el) => {
        const { text } = this.state;
        this.setState({text: text+el.text})

    }
    render() {
        const { text, showEmoji } = this.state;
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
        const currentMsg = chatmsg.filter(v => v.chatid === chatId)
        const emoji = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'.split(' ').filter(v=>v).map(v => ({text:v}));
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
                        const avatarIcon = require(`../images/${avatar|| 'h00001.png'}`);

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
                                    {content}
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
                            extra={
                                <div>
                                    <span role="img" aria-label="Snowman" style={{ marginRight: 15 }} onClick={this.onEmojiClick}>😀</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel
                        onClick={this.onGridClick}
                    ></Grid> : null}
                </div>
            </div>
        )
    }
}

export default Chat;