import React from 'react';
import { List, InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../../index.css'

import { register } from '../../redux/user.redux';

import Logo from '../../component/logo/logo';
import JobForm from '../../component/job-form';

@connect(
    ({ user }) => user,
    { register }
)
@JobForm
class Register extends React.Component {

    componentDidMount() {
        const { handleChange } = this.props;
        if (handleChange) {
            handleChange('type', 'genuis')
        }
    }

    onRegisterBtnClick = () => {
        const { register, state } = this.props;
        register(state);
    }

    render() {
        const { msg, redirectTo, handleChange, state } = this.props;
        const { type } = state;
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <p className="error-msg">{msg}</p> : null}
                        <InputItem
                            onChange={val => handleChange('user', val)}
                        >
                            用户
                        </InputItem>
                        <InputItem
                            onChange={val => handleChange('pwd', val)}
                            type="password"
                        >
                            密码
                        </InputItem>
                        <InputItem
                            onChange={val => handleChange('repeatPwd', val)}
                            type="password"
                        >
                            确认密码
                        </InputItem>
                        <WhiteSpace />
                        <RadioItem
                            onChange={() => handleChange('type', 'genuis')}
                            checked={type === 'genuis'}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            onChange={() => handleChange('type', 'boss')}
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