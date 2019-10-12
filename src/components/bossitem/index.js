import React from 'react';
import { Card, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import './index.css';

export default class BossItem extends React.Component {
    handleClick = () => {
        console.log('handleClick');
    }

    render() {
        const { data } = this.props;
        console.log('data', data);
        const { job, salary, compony, recruiter, tags } = data;
        const { name, position, icon } = recruiter;
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card onClick={this.handleClick}>
                    <Card.Header
                        title={job}
                        extra={<span>{salary}</span>}
                    />
                    <Card.Body>
                        <div>{compony}</div>
                        <div >{tags.map(t => (<Button className="tag" key={t}>   {t}    </Button>))}</div>
                    </Card.Body>
                    <Card.Footer content={<div><img alt='头像' src={icon} width={20} /> {name} · {position}</div>}  />
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        )
    }
}