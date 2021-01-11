import { gql } from '@apollo/client';

//Query
export const GET_ME = gql`
  query getMe {
    me {
      id
    }
  }
`;

export const GET_OPERATIONS = gql`
  query getOperations($startDateTime: DateTime!, $endDateTime: DateTime!, $accountId: String!) {
    me {
      operations(
        where: {
          createdAt: { gte: $startDateTime, lte: $endDateTime }
          accountId: { equals: $accountId }
        }
      ) {
        id
        name
        value
        type
        isPaid
        createdAt
      }
    }
  }
`;

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

//Mutation
export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

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
