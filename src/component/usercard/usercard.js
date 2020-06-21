import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired,
    }

    handleClick = (v) => {
        const { history } = this.props;
        history.push(`chat/${v._id}`);
    }

    render() {
        const { userlist } = this.props;
        return (
            <div>
                <WingBlank>
                    {userlist.map(v => (
                        <Card
                            key={v._id}
                            onClick={() => this.handleClick(v)}
                        >
                            <Card.Header
                                title={v.user}
                                // thumb={require(`../images/${v.avatar}`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {v.type === 'boss' ? <div>公司: {v.company}</div> : null}
                                {v.desc && v.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
                                {v.type === 'boss' ? <div>薪资: {v.money}</div> : null}
                            </Card.Body>
                        </Card>
                    ))}
                </WingBlank>
            </div>

        )
    }
}

export default UserCard;