import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login';
import GlobalStyle from './theme';

const httpLink = createHttpLink({
  uri: process.env.APOLLO_SERVER_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('withmoney-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
