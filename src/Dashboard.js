import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './Auth.redux';
import App from './App';

function Erying(params) {
    return(
        <h2>二营</h2>
    )
}

function Qibinglian(params) {
    return(
        <h2>骑兵连</h2>
    )
}

@connect(
    ({ auth }) => auth,
    { logout }
)
class Dashboard extends React.Component {
    render() {
        const { isAuth, logout, match } = this.props;
        if (!isAuth) {
            return (
                <Redirect to="/login"></Redirect>
            ) 
        }
         return (
             <div>
                <h2>Dashboard</h2>
                 <ul>
                     <li>
                         <Link to={`${match.url}`}>Dashboard</Link>
                     </li>
                     <li>
                         <Link to={`${match.url}/erying`}>erying</Link>
                     </li>
                     <li>
                         <Link to={`${match.url}/qibinglian`}>qibinglian</Link>
                     </li>
                     <li>
                         <Link to="/login">login</Link>
                     </li>
                 </ul>
                 <Route path={`${match.url}`} exact component={App}></Route>
                 <Route path={`${match.url}/erying`} component={Erying}></Route>
                 <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
                 <button onClick={logout}>注销</button>
             </div>
         )
    }
}

export default Dashboard;