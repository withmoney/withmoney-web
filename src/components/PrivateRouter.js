import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import checkAuth from '../utils/checkAuth';

const PrivateRouter = ({ component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => (
      checkAuth() ? <Component {...props} /> : <Redirect to="/login" />
    )}
  />
);

export default PrivateRouter;
