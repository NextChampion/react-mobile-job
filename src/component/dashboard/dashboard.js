import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route, } from 'react-router-dom';

import '../../index.css';
import Boss from '../boss/boss';
import Message from '../../container/message/message';
import Me from '../me/me';
import Genuis from '../genuis/genuis';
import NavLinkBar from '../navlink/navlink';
import { getMsgList, recvMsg } from '../../redux/chat.redux';


@connect(
    (state) => state,
    { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
    state = {
        selectedTab: 'one',
    }

    componentDidMount() {
        const { getMsgList, recvMsg, chat } = this.props;
        const { chatmsg } = chat || {};
        if (!chatmsg || !chatmsg.length) {
            getMsgList();
            recvMsg()
        }
    }

    render() {
        const { user, location } = this.props;
        const { pathname } = location;
        const { type } = user;
        const navList = [
            {
                path: '/boss',
                title: '牛人列表',
                icon: 'icon_home',
                component: Genuis,
                text: '牛人',
                hide: type === 'genuis',
            },
            {
                path: '/genuis',
                title: 'Boss列表',
                icon: 'icon_xiaoshipin',
                component: Boss,
                text: 'Boss ',
                hide: type === 'boss',
            },
            {
                path: '/message',
                title: '消息列表',
                icon: 'icon_saishi',
                component: Message,
                text: '消息',
            },
            {
                path: '/me',
                title: '个人中心',
                icon: 'icon_mine',
                component: Me,
                text: '个人中心',
            }
        ]
        const navInfo = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavLinkBar data={navList}></NavLinkBar>
                <NavBar className="fixed-header" mode="dark">{navInfo && navInfo.title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.title} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default DashBoard;