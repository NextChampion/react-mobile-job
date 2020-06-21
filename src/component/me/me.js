import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button } from 'antd-mobile';
import browserCookies from 'browser-cookies';
const { Item } = List;
@connect(
    ({ user }) => user
)
class Me extends React.Component {
    logout = () => {
        browserCookies.erase('userid');
    }

    render() {
        const { user, type, company, title, desc, money } = this.props;
        if (!user) {
            return null;
        }
        return (
            <div style={{ backgroundColor: 'red' }}>
                <Button onClick={this.logout}>退出登录</Button>
                <Result
                    img={<img style={{ width: 50, height: 50 }} src={require('../images/h00001.png')} alt="" />}
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