import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import ResetPassPage from './pages/ResetPassPage';
import EmailResetPage from './pages/EmailResetPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/resetPass" component={ResetPassPage} />
        <Route exact path="/emailTest" component={EmailResetPage}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
