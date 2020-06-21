import React from 'react';
import { List, InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../../index.css'

import { register } from '../../redux/user.redux';

import Logo from '../../component/logo/logo';

@connect(
    ({ user }) => user,
    {register}
)
class Register extends React.Component {
    state = {
        user: '',
        pwd: '',
        repeatPwd: '',
        type: 'genuis', // 或者boss
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val,
        })
    }

    onRegisterBtnClick = () => {
        const { register } = this.props;
        register(this.state); 
    }

    render() {
        const { msg, redirectTo } = this.props;
        const { type } = this.state;
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <p className="error-msg">{msg}</p> : null}
                        <InputItem 
                            onChange={val => this.handleChange('user', val)}
                        >
                            用户
                        </InputItem>
                        <InputItem 
                            onChange={val => this.handleChange('pwd', val)}
                            type="password"
                        >
                            密码
                        </InputItem>
                        <InputItem 
                            onChange={val => this.handleChange('repeatPwd', val)}
                            type="password"
                        >
                            确认密码
                        </InputItem>
                        <WhiteSpace />
                        <RadioItem 
                            onChange={() => this.handleChange('type', 'genuis')} 
                            checked={type === 'genuis'}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem 
                            onChange={() => this.handleChange('type', 'boss')} 
                            checked={type === 'boss'}
                        >
                            Boss
                        </RadioItem>
                        <WhiteSpace />
                        <Button onClick={this.onRegisterBtnClick} type="primary">注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register;