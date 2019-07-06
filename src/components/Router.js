import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import CheckEmail from './CheckEmail';
import VerifyAccnt from './VerifyAccnt';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/checkEmail' component={CheckEmail} />
            <Route exact path='/verifyAccnt' component={VerifyAccnt} />
        </Switch>
    </BrowserRouter>
);

export default Router;
