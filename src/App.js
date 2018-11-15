import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Login from './pages/Login';
import store from './store';
import './assets/style';

const App = () => (
  <Provider store={store}>
    <Router>
      <Login />
    </Router>
  </Provider>
);

export default hot(module)(App);
