import React from 'react';
import { List, InputItem, WingBlank, Button, NavBar, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { update } from '../../redux/user.redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';

@connect(
    ({ user }) => user,
    { update }
)
class BossInfo extends React.Component {
    state = {
        title: '',
        money: '',
        company: '',
        desc: '',
        avatar: '',
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val,
        })
    }

    onAvatarSelected = (image) => {
        console.log('onAvatarSelected', image);
        
        this.setState({ avatar: image })
    }

    onSaveButtonClick = () => {
        const { update } = this.props;
        console.log('state', this.state);
        if (update) {
            update(this.state);
        }
    }

    render() {
        const path = this.props.location.pathname;
        const { redirectTo } = this.props;
        return (
            <div>
                {redirectTo && redirectTo !== path ? <Redirect to={redirectTo} /> : null}
                <NavBar mode="dark">
                    BOSS完善信息页面
                </NavBar>
                <WingBlank>
                    <AvatarSelector selectAvatar={this.onAvatarSelected}></AvatarSelector>
                </WingBlank>
                <WingBlank>
                    <List>
                        <InputItem onChange={val => this.handleChange('title', val)}>
                            招聘职位
                        </InputItem>
                        <InputItem onChange={val => this.handleChange('company', val)}>
                            公司名称
                        </InputItem>
                        <InputItem onChange={val => this.handleChange('money', val)}>
                            职位薪资
                        </InputItem>
                        <TextareaItem
                            title="职位要求"
                            rows={3}
                            autoHeight
                            onChange={val => this.handleChange('desc', val)}
                        />
                    </List>
                </WingBlank>
                <Button type='primary' onClick={this.onSaveButtonClick}>保存</Button>
            </div>
        )
    }
}

export default BossInfo;