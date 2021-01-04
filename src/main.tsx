import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { setContext } from '@apollo/client/link/context';
import GlobalStyle from './theme';
import Routers from './routes';
import SidebarProvider from './hooks/useSidebarCollapse';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer />
    <ApolloProvider client={client}>
      <SidebarProvider>
        <Routers />
      </SidebarProvider>
    </ApolloProvider>
  </>
);

ReactDOM.render(<App />, document.querySelector('[root-react]'));
