import { gql } from '@apollo/client';

export const USER_REGISTER = gql`
  mutation userRegister(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      user: { firstName: $firstName, lastName: $lastName, email: $email, password: $password }
    )
  }
`;

export const CHECK_HASH = gql`
  mutation checkHash($hash: String!) {
    checkHashEmail(hash: $hash)
  }
`;

export const REQUEST_CHANGE_PASSWORD = gql`
  mutation requestChangePassword($email: String!) {
    requestChangePassword(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($hash: String!, $password: String!) {
    changePassword(hash: $hash, password: $password)
  }
`;
