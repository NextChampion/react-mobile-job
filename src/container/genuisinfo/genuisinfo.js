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
class GenuisInfo extends React.Component {
    state = {
        title: '',
        desc: '',
        avatar: '',
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val,
        })
    }
    
    onAvatarSelected = (image) => {
        console.log('niuren onAvatarSelected', image);
        
        this.setState({avatar: image})
    }

    onSaveButtonClick = () => {
        const { update } = this.props;
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
                    牛人完善信息页面
                </NavBar>
                <AvatarSelector 
                    selectAvatar={this.onAvatarSelected}
                >
                </AvatarSelector>
                <WingBlank>
                    <List>
                        <InputItem 
                            onChange={val => this.handleChange('title', val)}
                        >
                            求职职位
                        </InputItem>
                        <TextareaItem
                            title="个人简介"
                            rows={3}
                            autoHeight
                            onChange={val => this.handleChange('desc', val)}
                        />
                    </List>
                </WingBlank>
                <Button 
                    type='primary'
                    onClick={this.onSaveButtonClick}
                >
                    保存
                </Button>
            </div>
        )
    }
}

export default GenuisInfo;