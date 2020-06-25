import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

const { Item } = List;
@connect(
    ({ user }) => user,
    { logoutSubmit }
)
class Me extends React.Component {
    logout = () => {
        const { alert } = Modal;
        alert('注销', '确认退出吗?', [
            { text: '取消', onPress: () => { } },
            {
                text: '确认', onPress: () => {
                    browserCookies.erase('userid');
                    this.props.logoutSubmit();
                }
            },
        ])
    }

    render() {
        const { user, type, company, title, desc, money, redirectTo, avatar } = this.props;
        console.log('个人中心', this.props);
        
        if (!user) {
            if (redirectTo) {
                return <Redirect to={redirectTo} />
            }
            return null;
        }
        return (
            <div>

                <Button onClick={this.logout}>退出登录</Button>
                <Result
                    img={<img style={{ width: 50, height: 50 }} src={require(`../images/${avatar||'h00001.png'}`)} alt="" />}
                    title={user}
                    message={type === 'boss' ? company : null}
                />
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>
                        {title}
                        {desc && desc.split('\n').map(v => <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                        {money ? <List.Item.Brief>{money}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>
                        退出登录
                    </Item>
                </List>
            </div>


        )
    }
}

export default Me;