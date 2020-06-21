import React from 'react';
import { Card, WingBlank, WhiteSpace, List } from 'antd-mobile';
import './index.css';
const { Item } = List;

export default class ChatItem extends React.Component {
    handleClick = () => {
        console.log('handleClick');
    }

    render() {
        // compony: 'alibaba',
        // id: 100000,
        // name: '张三',
        // position: '前端开发主管',
        // icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        // lastMsg: '你好,我们在招聘前端开发',
        // lastMsgTs: '10:00',
        // unreadCount: 2,
        const { data } = this.props;
        console.log('data', data);
        const { compony, name, position, icon, lastMsg, lastMsgTs } = data;
        return (
            <WingBlank size="lg">
                <WhiteSpace />
                <Card onClick={this.handleClick}>
                    <Card.Header
                        title={name}
                        thumb={icon}
                        thumbStyle={{ width: 40 }}
                        extra={<div> {compony} · {position}</div>}
                    />
                    <Card.Footer content={lastMsg} extra={<div>{lastMsgTs}</div>} />
                </Card>
                <WhiteSpace />
            </WingBlank>
        )
    }
}