import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path ="/account" exact>
          <AccountPage />
        </Route>
        <Route path ="/recipes" exact>
          <RecipePage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
