import React from 'react';

import { ListView } from 'antd-mobile';
import ChatItem from '../../components/chatitem';

const data = [
    {
        compony: 'alibaba',
        id: 100000,
        name: '张三',
        position: '招聘者',
        icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        lastMsg: '你好,我们在招聘前端开发',
        lastMsgTs: '10:00',
        unreadCount: 2,
    },
    {
        compony: 'alibaba',
        id: 100001,
        name: '张三',
        position: '招聘者',
        icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        lastMsg: '你好,我们在招聘前端开发',
        lastMsgTs: '10:00',
        unreadCount: 2,
    },
    {
        compony: 'alibaba',
        id: 100002,
        name: '张三',
        position: '招聘者',
        icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        lastMsg: '你好,我们在招聘前端开发',
        lastMsgTs: '10:00',
        unreadCount: 2,
    },
    {
        compony: 'alibaba',
        id: 100003,
        name: '张三',
        position: '招聘者',
        icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        lastMsg: '你好,我们在招聘前端开发',
        lastMsgTs: '10:00',
        unreadCount: 2,
    },
    {
        compony: 'alibaba',
        id: 100004,
        name: '张三',
        position: '招聘者',
        icon: 'http://image.biaobaiju.com/uploads/20180830/19/1535628120-pcjIeVWdbl.jpg',
        lastMsg: '你好,我们在招聘前端开发',
        lastMsgTs: '10:00',
        unreadCount: 2,
    },
]

export default class Message extends React.Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1!==row2,
        })
        this.state = {
            dataSource: ds,
        }
    }

    componentDidMount() {
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.cloneWithRows(data),
        })
    }

    renderRow = (data) => {
        return <ChatItem data={data} />
    }
    render() {
        const { dataSource } = this.state;
        return (
            <ListView style={{
                height: '100%',
                overflow: 'auto',
            }} 
        dataSource={dataSource} renderRow={this.renderRow} />
        )
    }
}