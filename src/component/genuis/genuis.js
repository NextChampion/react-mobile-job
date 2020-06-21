import React from 'react';
import Axios from 'axios';
import UserCard from '../usercard/usercard';

class Genuis extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        Axios.get('/user/list?type=genuis')
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({
                        data: res.data.data
                    })
                }
            })
    }
    render() {
        const { data } = this.state;
        return (
            <UserCard userlist={data}/>
        )
    }
}

export default Genuis;