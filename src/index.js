import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './config'
import reducers from './reducer';
import Register from './container/register/register';
import Login from './container/login/login';
import BossInfo from './container/bossinfo/bossinfo';
import GenuisInfo from './container/genuisinfo/genuisinfo';
import DashBoard from './component/dashboard/dashboard';
import AuthRoute from './component/authroute/authroute';
import Chat from './component/chat/chat';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk),
));

console.log(store.getState()); 


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path="/bossinfo" exact component={BossInfo}></Route>
                <Route path="/genuisinfo" exact component={GenuisInfo}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/chat/:user" component={Chat}></Route>
                <Route component={DashBoard}></Route>
                {/* <Redirect to="/dashboard"></Redirect> */}
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)  
