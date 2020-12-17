import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RegistrationVerify from './pages/RegistrationVerify';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/signin" />
        <Route path="/signin" exact component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verify" component={RegistrationVerify} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
