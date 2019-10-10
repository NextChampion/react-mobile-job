import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BossInfo from './containers/bossinfo';
import GeniusInfo from './containers/geniusinfo';
import Login from './containers/login';
import Register from './containers/register';
import DashBoard from './components/dashboard';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route component={DashBoard}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
