import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import JobForm from '../../component/job-form';
@connect(
    ({ user }) => user,
    { login }
)
@JobForm
class Login extends React.Component {

    register = () => {
        this.props.history.push('./register')
    }

    onLoginClick = () => {
        const { login, state } = this.props;
        login(state);
    }

    render() {
        const { msg, redirectTo, handleChange } = this.props;
        return (
            <div>
                {redirectTo && redirectTo !== '/login' ? <Redirect to={redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg ? <p className="error-msg">{msg}</p> : null}
                        <InputItem
                            onChange={val => handleChange('user', val)}
                        >
                            用户
                        </InputItem>
                        <InputItem
                            type="password"
                            onChange={val => handleChange('pwd', val)}
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.onLoginClick} type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;