import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import GlobalStyle from './theme';
import Routers from './routes';
import SidebarProvider from './hooks/useSidebarCollapse';
import OperationsFiltersProvider from './hooks/useOperationsFilters';
import AccountFiltersProvider from './hooks/useAccountFilters';
import Toast from './components/Toast';

import './lang';
import 'react-toastify/dist/ReactToastify.css';
import './nprogress.css';

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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        findManyOperation: {
          merge: false,
        },
        findManyAccount: {
          merge: false,
        },
        findManyCategory: {
          merge: false,
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const App = () => (
  <>
    <GlobalStyle />
    <Toast />
    <ApolloProvider client={client}>
      <SidebarProvider>
        <OperationsFiltersProvider>
          <AccountFiltersProvider>
            <Routers />
          </AccountFiltersProvider>
        </OperationsFiltersProvider>
      </SidebarProvider>
    </ApolloProvider>
  </>
);

ReactDOM.render(<App />, document.querySelector('[root-react]'));
