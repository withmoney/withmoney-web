import { gql } from '@apollo/client';

// query
export const CATEGORY_SEARCH = gql`
  query categorySearch($name: String!, $type: TransactionType!) {
    categories: findManyCategory(
      where: { name: { contains: $name }, type: { equals: $type }, deletedAt: { equals: null } }
    ) {
      data {
        id
        name
        type
      }
    }
  }
`;

export const ALL_CATEGORY = gql`
  query filterCategories($name: String, $skip: Int, $take: Int, $type: TransactionType) {
    categories: findManyCategory(
      skip: $skip
      take: $take
      where: { name: { contains: $name }, type: { equals: $type }, deletedAt: { equals: null } }
      orderBy: [{ createdAt: desc }]
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
  query getUniqueCategory($id: String!) {
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
  mutation deleteCategory($id: String!) {
    deleteOneCategory(where: { id: $id }) {
      id
      name
      deletedAt
    }
  }
`;

export const RESTORE_CATEGORY = gql`
  mutation restoreCategory($id: String!) {
    restoreOneCategory(where: { id: $id }) {
      id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: String!, $name: String!, $type: TransactionType!) {
    updateOneCategory(where: { id: $id }, data: { name: $name, type: $type }) {
      id
      name
    }
  }
`;
