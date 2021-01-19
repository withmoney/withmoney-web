import { gql } from '@apollo/client';

// query
export const GET_OPERATIONS = gql`
  query getOperations($startDateTime: DateTime!, $endDateTime: DateTime!, $accountId: String!) {
    me {
      operations(
        where: {
          paidAt: { gte: $startDateTime, lte: $endDateTime }
          accountId: { equals: $accountId }
        }
        orderBy: [{ paidAt: asc }]
      ) {
        id
        name
        value
        type
        isPaid
        paidAt
        createdAt
        account {
          id
          name
        }
        category {
          id
          name
        }
      }
    }
  }
`;
// mutations

export const UPDATE_OPERATION = gql`
  mutation updateOperation(
    $id: String!
    $name: String!
    $categoryId: String!
    $accountId: String!
    $type: TransactionType!
    $value: Float!
    $isPaid: Boolean!
    $paidAt: DateTime!
  ) {
    updateOneOperation(
      where: { id: $id }
      data: {
        name: $name
        type: $type
        accountId: $accountId
        categoryId: $categoryId
        value: $value
        isPaid: $isPaid
        paidAt: $paidAt
      }
    ) {
      id
      name
    }
  }
`;
