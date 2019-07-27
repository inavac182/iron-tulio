import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import CheckEmail from './CheckEmail';
import VerifyAccnt from './VerifyAccnt';
import Home from './Home';

const theme = 'is-dark';
const Router = () => (
    <div id='content' className={theme}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/app' render={(props) => <App {...props} theme={theme} />}/>
                <Route exact path='/app/:projectId' render={(props) => <App {...props} theme={theme} />} />
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/checkEmail' component={CheckEmail} />
                <Route exact path='/verifyAccnt' component={VerifyAccnt} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default Router;
