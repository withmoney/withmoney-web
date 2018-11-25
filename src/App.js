import React, { Fragment } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Login from './pages/Login';
import Signup from './pages/Signup';
import store from './store';
import './assets/style';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Fragment>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Fragment>
    </HashRouter>
  </Provider>
);

export default hot(module)(App);
