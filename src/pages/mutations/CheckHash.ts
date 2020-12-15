import { gql } from '@apollo/client';

const CHECK_HASH = gql`
  mutation checkHash($hash: String!) {
    checkHashEmail(hash: $hash)
  }
`;

export default CHECK_HASH;
