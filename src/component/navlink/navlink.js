import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    static defaultProps = {
        data: [],
    }

    state = {
        selectedTab: 0,
    }

    render() {
        const { data, location, history } = this.props;
        const { pathname } = location
        const navList = data.filter(v => !v.hide);
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                {navList.map(v => (<TabBar.Item
                    title={v.title}
                    key={v.title}
                    icon={{ uri: require(`../images/tabbar/${v.icon}.png`) }}
                    selectedIcon={{ uri: require(`../images/tabbar/${v.icon}_pressed.png`) }}
                    selected={pathname === v.path}
                    badge={1}
                    onPress={() => {
                        history.push(v.path)
                    }}
                    data-seed="logId"
                >
                </TabBar.Item>))}
            </TabBar>
        )
    }
}

export default NavLinkBar;