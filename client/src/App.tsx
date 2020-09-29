import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { provide } from '@hilma/tools';
import { AuthProvider, HomeRoute, PublicOnlyRoute } from '@hilma/auth';

import { Login, CustomerHome, AdminHome } from './routes';

import './App.css';

const components: Record<string, React.ComponentType<any>> = { CustomerHome, AdminHome };

const App: React.FC = () => (
    <Switch>
        <PublicOnlyRoute path="/login" componentName="Login" component={Login} />
        <HomeRoute path="/" redirectPath="/login" components={components} />
    </Switch>
);

export default provide(
    Router,
    [AuthProvider, { logoutOnUnauthorized: true, accessTokenCookie: "klokloklo" }]
)(App);
