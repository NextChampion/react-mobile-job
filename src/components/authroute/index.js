/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2020-06-21 15:00:27
 * @LastEditTime: 2020-06-21 16:16:22
 * @LastEditors: zhangcunxia
 * @Description: 
 */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';

import axios from 'axios';

export default class AuthRoute extends PureComponent {
    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = async () => {
        // 获取用户信息
        const result = await axios.get('./user/info');
        console.log('result', result);
        const { status, data } = result;
        if (status !== 200) {
            return;
        }
        // 是否登录

        // 现在的url地址, login是不需要跳转的

        // type 用户身份  是boss还是牛人

        // 用户是否完善信息(头像和个人简介)
    }

    render() {
        return null
    }
}

