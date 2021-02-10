import { gql } from '@apollo/client';

// Queries
export const CREDIT_CARDS = gql`
  query getAllCards($id: String!) {
    allCreditCards: findManyCreditCard(
      where: { accountId: { equals: $id }, deletedAt: { equals: null } }
      orderBy: { name: asc }
    ) {
      data {
        id
        name
        brand
        limit
      }
    }
  }
`;

export const FILTER_CREDIT_CARD = gql`
  query filterCard($name: String!, $id: String!) {
    creditCards: findManyCreditCard(
      where: { accountId: { equals: $id }, name: { contains: $name }, deletedAt: { equals: null } }
    ) {
      data {
        id
        name
        brand
        limit
      }
    }
  }
`;

// Mutations

export const CREATE_CREDIT_CARD = gql`
  mutation createCreditCard(
    $name: String!
    $limit: Float!
    $brand: CreditCardBrand!
    $account: String!
  ) {
    createOneCreditCard(data: { name: $name, limit: $limit, brand: $brand, accountId: $account }) {
      id
      name
      limit
      brand
    }
  }
`;
