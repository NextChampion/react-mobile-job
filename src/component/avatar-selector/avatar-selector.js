import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {

    static propTypes = {
        selectAvatar: PropTypes.func,
    }

    static defaultProps = {
        selectAvatar: null,
    }

    state = {
        icon: '',
        text: '',
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val,
        })
    }

    onGridItemClick = (image) => {
        const { selectAvatar } = this.props;
        console.log('selectAvatar', image);
        console.log('selectAvatar', selectAvatar);
        
        if (selectAvatar) {
            selectAvatar(image.text);
        }
        this.setState(image)
    }

    render() {
        const avatarList = [
            'h00001.png',
            'h00002.jpg',
            'h00003.jpg',
            'h00004.jpg',
            'h00005.jpg',
            'h00006.jpg',
            'h00007.jpg',
            'h00008.jpg',
            'h00009.jpg',
            'h00010.jpg',
        ].map(a => ({
            icon: require(`../images/${a}`),
            text: a,
        }))
        const { icon } = this.state;
        const gridHeader = icon ? (
            <div>
                <span>已选择头像</span>
                <img style={{ width: 20, height: 20 }} src={icon} alt="" />
            </div>
        ) : <div>请选择头像</div>;
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={this.onGridItemClick}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;