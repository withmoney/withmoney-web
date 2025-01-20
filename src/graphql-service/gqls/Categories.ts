import { gql } from '@apollo/client';

// query

export const ALL_CATEGORY = gql`
  query filterCategories($name: String, $skip: Int, $take: Int, $type: TransactionType) {
    categories: findManyCategory(
      skip: $skip
      take: $take
      where: { name: { contains: $name }, type: { equals: $type }, deletedAt: { equals: null } }
      orderBy: [{ name: asc }]
    ) {
      data {
        id
        name
        type
        deletedAt
      }
      pagination {
        totalItems
      }
    }
  }
`;

export const GET_ONE_CATEGORY = gql`
  query getUniqueCategory($id: ID!) {
    findUniqueCategory(where: { id: $id }) {
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

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteOneCategory(where: { id: $id }) {
      id
      name
      deletedAt
    }
  }
`;

export const RESTORE_CATEGORY = gql`
  mutation restoreCategory($id: ID!) {
    restoreOneCategory(where: { id: $id }) {
      id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $name: String!, $type: TransactionType!) {
    updateOneCategory(where: { id: $id }, data: { name: $name, type: $type }) {
      id
      name
    }
  }
`;
