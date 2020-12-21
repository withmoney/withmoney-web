import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RegistrationVerify from './pages/RegistrationVerify';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import { AuthenticatedRoute, UnauthenticatedRoute } from './components/AuthenticatedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <UnauthenticatedRoute path="/signin" component={Login} />
        <UnauthenticatedRoute path="/signup" component={SignUp} />
        <UnauthenticatedRoute path="/verify" component={RegistrationVerify} />
        <UnauthenticatedRoute path="/reset-password" component={ResetPassword} />
        <UnauthenticatedRoute path="/change-password" component={ChangePassword} />
        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
