import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
import SignUp from './pages/SignUp';
import RegistrationVerify from './pages/RegistrationVerify';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verify" component={RegistrationVerify} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
