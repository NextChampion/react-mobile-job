import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { login } from './Auth.redux';

@connect(
    ({ auth }) => auth,
    { login }
)
class Auth extends React.Component {
    state = { 
        data: {}
    }

    componentDidMount() {
        axios.get('/data').then(res=>{
            const { status, data: tempData } = res;
            if (status === 200) {
                const { data } = tempData;
                this.setState({ data })
            }
        })
    }

    render() {
        const { isAuth } = this.props;
        if (isAuth) {
            return(
                <Redirect to="/dashboard"></Redirect>
            )
        }
        return (
            <div>
                <h1>登录页面</h1>
                <h2>你没有权限,需要登录</h2>  
                <button onClick={this.props.login}>登录</button> 
            </div>
        )
    }
}

export default Auth;