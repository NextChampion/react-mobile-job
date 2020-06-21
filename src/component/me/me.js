import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace } from 'antd-mobile';
import browserCookies from 'browser-cookies';
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
            <div>
                <Result
                    img={<img style={{ width: 50, height: 50 }} src={require('../images/h00001.png')} alt="" />}
                    title={user}
                    message={type === 'boss' ? company : null}
                />
                <List renderHeader={()=>'简介'}>
                    <List.Item multipleLine>
                        {title}
                        <List.Item.Brief>{desc.split('\n').map(v => <div key={v}>{v}</div>)}</List.Item.Brief>
                        {money ? <List.Item.Brief>{money}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick={this.logout}>
                        退出登录
                    </List.Item>
                </List>
            </div>

            
        )
    }
}

export default Me;