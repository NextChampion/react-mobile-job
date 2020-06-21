import React from 'react';
import Logo from '../../components/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';

const { RadioItem } = Radio;

export default class Register extends React.Component {
    state = {
        type: 'genius', // 求职者

    }

    register = () => {
        const { history } = this.props;
        history.push('/register');
    }

    render() {
        const { type } = this.state;
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem checked={type ==='genius'}>牛人</RadioItem>
                        <RadioItem checked={type ==='boss'}>老板</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}