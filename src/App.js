import React, { Fragment } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import PrivateRouter from 'components/PrivateRouter';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import store from 'app/store';

import 'styles';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Fragment>
        <Switch>
          <PrivateRouter path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Fragment>
    </HashRouter>
  </Provider>
);

export default hot(module)(App);
