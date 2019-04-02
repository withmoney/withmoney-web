import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import checkAuth from 'app/utils/checkAuth';

const PrivateRouter = ({ component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => (checkAuth() ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

PrivateRouter.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRouter;
