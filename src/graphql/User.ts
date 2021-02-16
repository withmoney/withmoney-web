import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String!, $lastName: String!, $email: String!, $language: Locale) {
    updateOneUser(
      data: { firstName: $firstName, lastName: $lastName, email: $email, language: $language }
    ) {
      id
      firstName
      lastName
      email
      language
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changeUserPassword($oldPassword: String!, $newPassword: String!) {
    changeUserPassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
