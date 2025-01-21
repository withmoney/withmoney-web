import { gql } from '@apollo/client';

// query

export const ALL_CATEGORY = gql`
  fragment CategoryFields on Category {
    id
    name
    type
    createdAt
    updatedAt
    deletedAt
  }

  query filterCategories($name: String, $skip: Int, $take: Int, $type: TransactionType) {
    categories: findManyCategory(
      skip: $skip
      take: $take
      where: { name: { contains: $name }, type: { equals: $type }, deletedAt: { equals: null } }
      orderBy: [{ name: asc }]
    ) {
      data {
        ...CategoryFields
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
  mutation CreateCategory($input: CategoryCreateInput!) {
    createOneCategory(data: $input) {
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
  mutation UpdateCategory($id: ID!, $input: CategoryUpdateInput!) {
    updateOneCategory(where: { id: $id }, data: $input) {
      id
      name
    }
  }
`;
