import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadedUserinfo } from '../../redux/user.redux';

@withRouter
@connect(
    null,
    { loadedUserinfo }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const { location, history } = this.props;
        const { pathname } = location;
        // 公开页面 登录和注册
        const publickList = ['/login', '/register'];
        // 如果当前处于公开页面,则不必获取用户信息了 
        if (publickList.indexOf(pathname) > -1) {
            return;
        }
        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    const { data } = res;
                    const { code, data: userinfo } = data;
                    if (code === 1) {
                        // 没有有用户信息
                        history.push('./login');
                        return
                    }
                    // 如果有用户信息了
                    this.props.loadedUserinfo(userinfo);
                }
            })
        // 是否登录

        // 现在的url地址, login是不需要跳转的

        // 用户的身份 是 牛人 还是boss

        // 用户是否完善用户信息 (选择头像 个人简介)
    }


    render() {
        return null
    }
}

export default AuthRoute;