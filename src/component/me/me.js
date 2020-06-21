import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button } from 'antd-mobile';
import browserCookies from 'browser-cookies';
@connect(
    ({ user }) => user
)
class Me extends React.Component {
    logout = () => {
        console.log('logout');

        browserCookies.erase('userid');
    }

    render() {
        const { user, type, company, title, desc, money } = this.props;
        console.log('uerrrr', this.props);

        if (!user) {
            return null;
        }
        return (
            <div>
                <Result
                    img={<img style={{ width: 50, height: 50 }} src={require('../images/h00001.png')} alt="" />}
                    title={user}
                    message={type === 'boss' ? company : null}
                />
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>
                        {title}
                        <List.Item.Brief>{desc && desc.split('\n').map(v => <div key={v}>{v}</div>)}</List.Item.Brief>
                        {money ? <List.Item.Brief>{money}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button onClick={this.logout}>
                        退出登录
                    </Button>
                </List>
            </div>


        )
    }
}

export default Me;