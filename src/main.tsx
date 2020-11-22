import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Login from './pages/Login';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }
`;

const client = new ApolloClient({
  uri: process.env.APOLLO_SERVER_API,
  request: async operation => {
    // Get JWT token from local storage
    const token = window.localStorage.getItem('withmoney-token');

    // Pass token to headers
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

const App = () => (
  <>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>
  </>
);

ReactDOM.render(<App />, document.querySelector('[root-react]'));
