import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER = gql`
  query {
    user {
      id
      firstName
      lastName
      email
      hasVerifiedEmail
    }
  }
`;

export const useUser = () => {
  const { loading, data, error } = useQuery(GET_USER);
  return { loading, data, error };
};
