import React from 'react';
import Logo from '../../components/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
export default class Login extends React.Component {
    login = () => {

    }

    register = () => {
        const { history } = this.props;
        history.push('/register');
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}