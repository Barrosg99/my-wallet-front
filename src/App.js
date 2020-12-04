import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';
import GlobalStyle from './assets/styles';
import SignUp from './pages/signUp/index';
import SignIn from './pages/signIn/index';
import MyWallet from './pages/myWallet/index';
import Transactions from './pages/transaction/index';


export default function App() {
    return (
        <UserProvider>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path = '/signUp' component = {SignUp} />
                    <Route path = '/signIn' component = {SignIn} />
                    <Route path = '/register/:transactionType' component = {Transactions} />
                    <Route path = '/' component = {MyWallet} />
                </Switch>
            </Router>
        </UserProvider>
    )
}