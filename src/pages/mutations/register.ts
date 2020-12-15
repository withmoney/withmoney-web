import { gql } from '@apollo/client';

const USER_REGISTER = gql`
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

export default USER_REGISTER;
