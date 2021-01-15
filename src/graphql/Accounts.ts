import { gql } from '@apollo/client';

// query
export const GET_ACCOUNTS = gql`
  query getAccounts {
    me {
      accounts {
        id
        name
      }
    }
  }
`;

// mutations
