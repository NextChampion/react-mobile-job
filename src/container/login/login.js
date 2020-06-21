import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
@connect(
    ({ user }) => user,
    { login }
)
class Login extends React.Component {
    state = {
        user: '',
        pwd: '',
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val,
        })
    }

    register = () => {
        this.props.history.push('./register')
    }

    onLoginClick = () => {
        const { login } = this.props;
        login(this.state);
    }
     
    render() {
        const { msg, redirectTo } = this.props;

        return (
            <div>
                {redirectTo ? <Redirect to={redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg ? <p className="error-msg">{msg}</p> : null}
                        <InputItem 
                            onChange={val => this.handleChange('user', val)}
                        >
                            用户
                        </InputItem>
                        <InputItem
                            type="password"
                            onChange={val => this.handleChange('pwd', val)}
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.onLoginClick} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;