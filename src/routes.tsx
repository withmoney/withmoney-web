import React from 'react';
import { HashRouter, Switch, Redirect } from 'react-router-dom';

import {
  Login,
  SignUp,
  Dashboard,
  ChangePassword,
  ResetPassword,
  RegistrationVerify,
} from './pages';

import { AuthenticatedRoute, UnauthenticatedRoute } from './components/AuthenticatedRoute';

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <UnauthenticatedRoute path="/signin" component={Login} />
        <UnauthenticatedRoute path="/signup" component={SignUp} />
        <UnauthenticatedRoute path="/verify" component={RegistrationVerify} />
        <UnauthenticatedRoute path="/reset-password" component={ResetPassword} />
        <UnauthenticatedRoute path="/change-password" component={ChangePassword} />
        <AuthenticatedRoute path="/" component={Dashboard} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
