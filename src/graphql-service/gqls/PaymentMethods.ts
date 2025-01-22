import { gql } from '@apollo/client';

export const PAYMENT_METHOD_FRAGMENT = gql`
  fragment PaymentMethodFields on PaymentMethod {
    id
    userId
    accountId
    name
    updatedAt
    deletedAt
    createdAt
  }
`;

export const ALL_PAYMENT_METHODS = gql`
  query PaymentMethods(
    $where: PaymentMethodWhereInput
    $orderBy: [PaymentMethodOrderByInput]
    $cursor: PaymentMethodWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    paymentMethods(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      data {
        ...PaymentMethodFields
      }
      pagination {
        totalItems
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;

export const GET_ONE_PAYMENT_METHOD = gql`
  query PaymentMethod($where: PaymentMethodWhereUniqueInput) {
    paymentMethod(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;

export const DELETE_PAYMENT_METHOD = gql`
  mutation PaymentMethodDeleteOne($where: PaymentMethodWhereUniqueInput!) {
    paymentMethodDeleteOne(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;

export const RESTORE_PAYMENT_METHOD = gql`
  mutation PaymentMethodRestoreOne($where: PaymentMethodWhereUniqueInput!) {
    paymentMethodRestoreOne(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;

export const CREATE_PAYMENT_METHOD = gql`
  mutation PaymentMethodCreateOne($input: PaymentMethodCreateInput!) {
    paymentMethodCreateOne(input: $input) {
      data {
        ...PaymentMethodFields
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;

export const UPDATE_PAYMENT_METHOD = gql`
  mutation PaymentMethodUpdateOne(
    $input: PaymentMethodUpdateInput!
    $paymentMethodUpdateOneId: String!
  ) {
    paymentMethodUpdateOne(input: $input, id: $paymentMethodUpdateOneId) {
      data {
        ...PaymentMethodFields
      }
    }
  }

  ${PAYMENT_METHOD_FRAGMENT}
`;
