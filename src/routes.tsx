import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RegistrationVerify from './pages/RegistrationVerify';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verify" component={RegistrationVerify} />
        <Route path="/password-recovery" component={ResetPassword} />
        <Route path="/reset-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
