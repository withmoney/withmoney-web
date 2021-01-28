import { gql } from '@apollo/client';

// query
export const CATEGORY_SEARCH = gql`
  query categorySearch($name: String!, $type: TransactionType!) {
    categories: findManyCategory(where: { name: { contains: $name }, type: { equals: $type } }) {
      id
      name
      type
    }
  }
`;

export const ALL_CATEGORY = gql`
  query getAllCategories {
    categories: findManyCategory(orderBy: [{ name: asc }]) {
      id
      name
      type
    }
  }
`;

// mutations
export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!, $type: TransactionType!) {
    createOneCategory(data: { name: $name, type: $type }) {
      id
      name
    }
  }
`;
