import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const CategoryFieldsFragmentDoc = gql`
  fragment CategoryFields on Category {
    id
    name
    type
    createdAt
    updatedAt
    deletedAt
  }
`;
export const OperationFieldsFragmentDoc = gql`
  fragment OperationFields on Operation {
    id
    name
    value
    type
    isPaid
    paidAt
    createdAt
    accountId
    categoryId
    creditCardId
    paymentMethodId
    paymentMethod {
      data {
        id
        userId
        accountId
        name
        updatedAt
        deletedAt
        createdAt
      }
    }
  }
`;
export const PaymentMethodFieldsFragmentDoc = gql`
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
export const GetAccountsDocument = gql`
  query getAccounts {
    accounts: findManyAccount(where: { deletedAt: { equals: null } }, orderBy: [{ name: asc }]) {
      id
      name
      currency
    }
  }
`;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.GetAccountsQuery, Types.GetAccountsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetAccountsQuery, Types.GetAccountsQueryVariables>(
    GetAccountsDocument,
    options,
  );
}
export function useGetAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAccountsQuery,
    Types.GetAccountsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetAccountsQuery, Types.GetAccountsQueryVariables>(
    GetAccountsDocument,
    options,
  );
}
export function useGetAccountsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetAccountsQuery, Types.GetAccountsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetAccountsQuery, Types.GetAccountsQueryVariables>(
    GetAccountsDocument,
    options,
  );
}
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsSuspenseQueryHookResult = ReturnType<typeof useGetAccountsSuspenseQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<
  Types.GetAccountsQuery,
  Types.GetAccountsQueryVariables
>;
export const GetUniqueAccountDocument = gql`
  query getUniqueAccount($id: ID!) {
    findUniqueAccount(where: { id: $id }) {
      id
      name
      currency
      deletedAt
    }
  }
`;

/**
 * __useGetUniqueAccountQuery__
 *
 * To run a query within a React component, call `useGetUniqueAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUniqueAccountQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetUniqueAccountQuery,
    Types.GetUniqueAccountQueryVariables
  > &
    ({ variables: Types.GetUniqueAccountQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUniqueAccountQuery, Types.GetUniqueAccountQueryVariables>(
    GetUniqueAccountDocument,
    options,
  );
}
export function useGetUniqueAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUniqueAccountQuery,
    Types.GetUniqueAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUniqueAccountQuery, Types.GetUniqueAccountQueryVariables>(
    GetUniqueAccountDocument,
    options,
  );
}
export function useGetUniqueAccountSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetUniqueAccountQuery,
        Types.GetUniqueAccountQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUniqueAccountQuery, Types.GetUniqueAccountQueryVariables>(
    GetUniqueAccountDocument,
    options,
  );
}
export type GetUniqueAccountQueryHookResult = ReturnType<typeof useGetUniqueAccountQuery>;
export type GetUniqueAccountLazyQueryHookResult = ReturnType<typeof useGetUniqueAccountLazyQuery>;
export type GetUniqueAccountSuspenseQueryHookResult = ReturnType<
  typeof useGetUniqueAccountSuspenseQuery
>;
export type GetUniqueAccountQueryResult = Apollo.QueryResult<
  Types.GetUniqueAccountQuery,
  Types.GetUniqueAccountQueryVariables
>;
export const CreateAccountDocument = gql`
  mutation createAccount($name: String!, $currency: Currency!) {
    createOneAccount(data: { name: $name, currency: $currency }) {
      id
      name
    }
  }
`;
export type CreateAccountMutationFn = Apollo.MutationFunction<
  Types.CreateAccountMutation,
  Types.CreateAccountMutationVariables
>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      name: // value for 'name'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateAccountMutation,
    Types.CreateAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateAccountMutation, Types.CreateAccountMutationVariables>(
    CreateAccountDocument,
    options,
  );
}
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<Types.CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateAccountMutation,
  Types.CreateAccountMutationVariables
>;
export const UpdateAccountDocument = gql`
  mutation updateAccount($id: ID!, $name: String!, $currency: Currency!) {
    updateOneAccount(where: { id: $id }, data: { name: $name, currency: $currency }) {
      id
      name
    }
  }
`;
export type UpdateAccountMutationFn = Apollo.MutationFunction<
  Types.UpdateAccountMutation,
  Types.UpdateAccountMutationVariables
>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useUpdateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateAccountMutation,
    Types.UpdateAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdateAccountMutation, Types.UpdateAccountMutationVariables>(
    UpdateAccountDocument,
    options,
  );
}
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<Types.UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateAccountMutation,
  Types.UpdateAccountMutationVariables
>;
export const DeleteAccountDocument = gql`
  mutation deleteAccount($id: ID!) {
    deleteOneAccount(where: { id: $id }) {
      id
      name
    }
  }
`;
export type DeleteAccountMutationFn = Apollo.MutationFunction<
  Types.DeleteAccountMutation,
  Types.DeleteAccountMutationVariables
>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteAccountMutation,
    Types.DeleteAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeleteAccountMutation, Types.DeleteAccountMutationVariables>(
    DeleteAccountDocument,
    options,
  );
}
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<Types.DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteAccountMutation,
  Types.DeleteAccountMutationVariables
>;
export const RestoreAccountDocument = gql`
  mutation restoreAccount($id: ID!) {
    restoreOneAccount(where: { id: $id }) {
      id
      name
    }
  }
`;
export type RestoreAccountMutationFn = Apollo.MutationFunction<
  Types.RestoreAccountMutation,
  Types.RestoreAccountMutationVariables
>;

/**
 * __useRestoreAccountMutation__
 *
 * To run a mutation, you first call `useRestoreAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreAccountMutation, { data, loading, error }] = useRestoreAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RestoreAccountMutation,
    Types.RestoreAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.RestoreAccountMutation, Types.RestoreAccountMutationVariables>(
    RestoreAccountDocument,
    options,
  );
}
export type RestoreAccountMutationHookResult = ReturnType<typeof useRestoreAccountMutation>;
export type RestoreAccountMutationResult = Apollo.MutationResult<Types.RestoreAccountMutation>;
export type RestoreAccountMutationOptions = Apollo.BaseMutationOptions<
  Types.RestoreAccountMutation,
  Types.RestoreAccountMutationVariables
>;
export const GetMeDocument = gql`
  query getMe {
    me {
      id
      firstName
      lastName
      email
      language
      createdAt
      deletedAt
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(GetMeDocument, options);
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(GetMeDocument, options);
}
export function useGetMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<Types.GetMeQuery, Types.GetMeQueryVariables>;
export const UserLoginDocument = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export type UserLoginMutationFn = Apollo.MutationFunction<
  Types.UserLoginMutation,
  Types.UserLoginMutationVariables
>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserLoginMutation,
    Types.UserLoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UserLoginMutation, Types.UserLoginMutationVariables>(
    UserLoginDocument,
    options,
  );
}
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<Types.UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<
  Types.UserLoginMutation,
  Types.UserLoginMutationVariables
>;
export const UserRegisterDocument = gql`
  mutation userRegister(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $currency: Currency
    $language: Locale
  ) {
    register(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        currency: $currency
        language: $language
      }
    )
  }
`;
export type UserRegisterMutationFn = Apollo.MutationFunction<
  Types.UserRegisterMutation,
  Types.UserRegisterMutationVariables
>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      currency: // value for 'currency'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUserRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserRegisterMutation,
    Types.UserRegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UserRegisterMutation, Types.UserRegisterMutationVariables>(
    UserRegisterDocument,
    options,
  );
}
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<Types.UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<
  Types.UserRegisterMutation,
  Types.UserRegisterMutationVariables
>;
export const CheckHashDocument = gql`
  mutation checkHash($hash: String!) {
    checkHashEmail(hash: $hash)
  }
`;
export type CheckHashMutationFn = Apollo.MutationFunction<
  Types.CheckHashMutation,
  Types.CheckHashMutationVariables
>;

/**
 * __useCheckHashMutation__
 *
 * To run a mutation, you first call `useCheckHashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckHashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkHashMutation, { data, loading, error }] = useCheckHashMutation({
 *   variables: {
 *      hash: // value for 'hash'
 *   },
 * });
 */
export function useCheckHashMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CheckHashMutation,
    Types.CheckHashMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CheckHashMutation, Types.CheckHashMutationVariables>(
    CheckHashDocument,
    options,
  );
}
export type CheckHashMutationHookResult = ReturnType<typeof useCheckHashMutation>;
export type CheckHashMutationResult = Apollo.MutationResult<Types.CheckHashMutation>;
export type CheckHashMutationOptions = Apollo.BaseMutationOptions<
  Types.CheckHashMutation,
  Types.CheckHashMutationVariables
>;
export const RequestChangePasswordDocument = gql`
  mutation requestChangePassword($email: String!) {
    requestChangePassword(email: $email)
  }
`;
export type RequestChangePasswordMutationFn = Apollo.MutationFunction<
  Types.RequestChangePasswordMutation,
  Types.RequestChangePasswordMutationVariables
>;

/**
 * __useRequestChangePasswordMutation__
 *
 * To run a mutation, you first call `useRequestChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestChangePasswordMutation, { data, loading, error }] = useRequestChangePasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RequestChangePasswordMutation,
    Types.RequestChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RequestChangePasswordMutation,
    Types.RequestChangePasswordMutationVariables
  >(RequestChangePasswordDocument, options);
}
export type RequestChangePasswordMutationHookResult = ReturnType<
  typeof useRequestChangePasswordMutation
>;
export type RequestChangePasswordMutationResult =
  Apollo.MutationResult<Types.RequestChangePasswordMutation>;
export type RequestChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.RequestChangePasswordMutation,
  Types.RequestChangePasswordMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation changePassword($hash: String!, $password: String!) {
    changePassword(hash: $hash, password: $password)
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  Types.ChangePasswordMutation,
  Types.ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      hash: // value for 'hash'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ChangePasswordMutation,
    Types.ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.ChangePasswordMutation, Types.ChangePasswordMutationVariables>(
    ChangePasswordDocument,
    options,
  );
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<Types.ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ChangePasswordMutation,
  Types.ChangePasswordMutationVariables
>;
export const FilterCategoriesDocument = gql`
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
  ${CategoryFieldsFragmentDoc}
`;

/**
 * __useFilterCategoriesQuery__
 *
 * To run a query within a React component, call `useFilterCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterCategoriesQuery({
 *   variables: {
 *      name: // value for 'name'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useFilterCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.FilterCategoriesQuery,
    Types.FilterCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.FilterCategoriesQuery, Types.FilterCategoriesQueryVariables>(
    FilterCategoriesDocument,
    options,
  );
}
export function useFilterCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FilterCategoriesQuery,
    Types.FilterCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.FilterCategoriesQuery, Types.FilterCategoriesQueryVariables>(
    FilterCategoriesDocument,
    options,
  );
}
export function useFilterCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.FilterCategoriesQuery,
        Types.FilterCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.FilterCategoriesQuery, Types.FilterCategoriesQueryVariables>(
    FilterCategoriesDocument,
    options,
  );
}
export type FilterCategoriesQueryHookResult = ReturnType<typeof useFilterCategoriesQuery>;
export type FilterCategoriesLazyQueryHookResult = ReturnType<typeof useFilterCategoriesLazyQuery>;
export type FilterCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useFilterCategoriesSuspenseQuery
>;
export type FilterCategoriesQueryResult = Apollo.QueryResult<
  Types.FilterCategoriesQuery,
  Types.FilterCategoriesQueryVariables
>;
export const SearchCategoryDocument = gql`
  query SearchCategory(
    $where: CategoryWhereInput
    $orderBy: [CategoryOrderByInput]
    $skip: Int
    $take: Int
  ) {
    findManyCategory(take: $take, skip: $skip, orderBy: $orderBy, where: $where) {
      data {
        ...CategoryFields
      }
      pagination {
        totalItems
      }
    }
  }
  ${CategoryFieldsFragmentDoc}
`;

/**
 * __useSearchCategoryQuery__
 *
 * To run a query within a React component, call `useSearchCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCategoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useSearchCategoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.SearchCategoryQuery,
    Types.SearchCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.SearchCategoryQuery, Types.SearchCategoryQueryVariables>(
    SearchCategoryDocument,
    options,
  );
}
export function useSearchCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SearchCategoryQuery,
    Types.SearchCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.SearchCategoryQuery, Types.SearchCategoryQueryVariables>(
    SearchCategoryDocument,
    options,
  );
}
export function useSearchCategorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.SearchCategoryQuery,
        Types.SearchCategoryQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.SearchCategoryQuery, Types.SearchCategoryQueryVariables>(
    SearchCategoryDocument,
    options,
  );
}
export type SearchCategoryQueryHookResult = ReturnType<typeof useSearchCategoryQuery>;
export type SearchCategoryLazyQueryHookResult = ReturnType<typeof useSearchCategoryLazyQuery>;
export type SearchCategorySuspenseQueryHookResult = ReturnType<
  typeof useSearchCategorySuspenseQuery
>;
export type SearchCategoryQueryResult = Apollo.QueryResult<
  Types.SearchCategoryQuery,
  Types.SearchCategoryQueryVariables
>;
export const GetUniqueCategoryDocument = gql`
  query getUniqueCategory($id: ID!) {
    findUniqueCategory(where: { id: $id }) {
      id
      name
      type
    }
  }
`;

/**
 * __useGetUniqueCategoryQuery__
 *
 * To run a query within a React component, call `useGetUniqueCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUniqueCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetUniqueCategoryQuery,
    Types.GetUniqueCategoryQueryVariables
  > &
    ({ variables: Types.GetUniqueCategoryQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUniqueCategoryQuery, Types.GetUniqueCategoryQueryVariables>(
    GetUniqueCategoryDocument,
    options,
  );
}
export function useGetUniqueCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUniqueCategoryQuery,
    Types.GetUniqueCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUniqueCategoryQuery, Types.GetUniqueCategoryQueryVariables>(
    GetUniqueCategoryDocument,
    options,
  );
}
export function useGetUniqueCategorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetUniqueCategoryQuery,
        Types.GetUniqueCategoryQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetUniqueCategoryQuery,
    Types.GetUniqueCategoryQueryVariables
  >(GetUniqueCategoryDocument, options);
}
export type GetUniqueCategoryQueryHookResult = ReturnType<typeof useGetUniqueCategoryQuery>;
export type GetUniqueCategoryLazyQueryHookResult = ReturnType<typeof useGetUniqueCategoryLazyQuery>;
export type GetUniqueCategorySuspenseQueryHookResult = ReturnType<
  typeof useGetUniqueCategorySuspenseQuery
>;
export type GetUniqueCategoryQueryResult = Apollo.QueryResult<
  Types.GetUniqueCategoryQuery,
  Types.GetUniqueCategoryQueryVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CategoryCreateInput!) {
    createOneCategory(data: $input) {
      id
      name
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  Types.CreateCategoryMutation,
  Types.CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateCategoryMutation,
    Types.CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateCategoryMutation, Types.CreateCategoryMutationVariables>(
    CreateCategoryDocument,
    options,
  );
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<Types.CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCategoryMutation,
  Types.CreateCategoryMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation deleteCategory($id: ID!) {
    deleteOneCategory(where: { id: $id }) {
      id
      name
      deletedAt
    }
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  Types.DeleteCategoryMutation,
  Types.DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteCategoryMutation,
    Types.DeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeleteCategoryMutation, Types.DeleteCategoryMutationVariables>(
    DeleteCategoryDocument,
    options,
  );
}
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<Types.DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteCategoryMutation,
  Types.DeleteCategoryMutationVariables
>;
export const RestoreCategoryDocument = gql`
  mutation restoreCategory($id: ID!) {
    restoreOneCategory(where: { id: $id }) {
      id
      name
    }
  }
`;
export type RestoreCategoryMutationFn = Apollo.MutationFunction<
  Types.RestoreCategoryMutation,
  Types.RestoreCategoryMutationVariables
>;

/**
 * __useRestoreCategoryMutation__
 *
 * To run a mutation, you first call `useRestoreCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreCategoryMutation, { data, loading, error }] = useRestoreCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RestoreCategoryMutation,
    Types.RestoreCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.RestoreCategoryMutation, Types.RestoreCategoryMutationVariables>(
    RestoreCategoryDocument,
    options,
  );
}
export type RestoreCategoryMutationHookResult = ReturnType<typeof useRestoreCategoryMutation>;
export type RestoreCategoryMutationResult = Apollo.MutationResult<Types.RestoreCategoryMutation>;
export type RestoreCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.RestoreCategoryMutation,
  Types.RestoreCategoryMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryUpdateInput!) {
    updateOneCategory(where: { id: $id }, data: $input) {
      id
      name
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  Types.UpdateCategoryMutation,
  Types.UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateCategoryMutation,
    Types.UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdateCategoryMutation, Types.UpdateCategoryMutationVariables>(
    UpdateCategoryDocument,
    options,
  );
}
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<Types.UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateCategoryMutation,
  Types.UpdateCategoryMutationVariables
>;
export const FilterCreditCardDocument = gql`
  query filterCreditCard($name: String, $id: ID, $skip: Int, $take: Int) {
    creditCards: findManyCreditCard(
      skip: $skip
      take: $take
      where: { accountId: { equals: $id }, name: { contains: $name }, deletedAt: { equals: null } }
      orderBy: [{ createdAt: desc }]
    ) {
      data {
        id
        name
        brand
        limit
      }
      pagination {
        totalItems
      }
    }
  }
`;

/**
 * __useFilterCreditCardQuery__
 *
 * To run a query within a React component, call `useFilterCreditCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterCreditCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterCreditCardQuery({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFilterCreditCardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.FilterCreditCardQuery,
    Types.FilterCreditCardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.FilterCreditCardQuery, Types.FilterCreditCardQueryVariables>(
    FilterCreditCardDocument,
    options,
  );
}
export function useFilterCreditCardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FilterCreditCardQuery,
    Types.FilterCreditCardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.FilterCreditCardQuery, Types.FilterCreditCardQueryVariables>(
    FilterCreditCardDocument,
    options,
  );
}
export function useFilterCreditCardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.FilterCreditCardQuery,
        Types.FilterCreditCardQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.FilterCreditCardQuery, Types.FilterCreditCardQueryVariables>(
    FilterCreditCardDocument,
    options,
  );
}
export type FilterCreditCardQueryHookResult = ReturnType<typeof useFilterCreditCardQuery>;
export type FilterCreditCardLazyQueryHookResult = ReturnType<typeof useFilterCreditCardLazyQuery>;
export type FilterCreditCardSuspenseQueryHookResult = ReturnType<
  typeof useFilterCreditCardSuspenseQuery
>;
export type FilterCreditCardQueryResult = Apollo.QueryResult<
  Types.FilterCreditCardQuery,
  Types.FilterCreditCardQueryVariables
>;
export const GetUniqueCreditCardDocument = gql`
  query getUniqueCreditCard($id: ID!) {
    findUniqueCreditCard(where: { id: $id }) {
      id
      name
      limit
      brand
    }
  }
`;

/**
 * __useGetUniqueCreditCardQuery__
 *
 * To run a query within a React component, call `useGetUniqueCreditCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueCreditCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueCreditCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUniqueCreditCardQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetUniqueCreditCardQuery,
    Types.GetUniqueCreditCardQueryVariables
  > &
    ({ variables: Types.GetUniqueCreditCardQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUniqueCreditCardQuery, Types.GetUniqueCreditCardQueryVariables>(
    GetUniqueCreditCardDocument,
    options,
  );
}
export function useGetUniqueCreditCardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUniqueCreditCardQuery,
    Types.GetUniqueCreditCardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetUniqueCreditCardQuery,
    Types.GetUniqueCreditCardQueryVariables
  >(GetUniqueCreditCardDocument, options);
}
export function useGetUniqueCreditCardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetUniqueCreditCardQuery,
        Types.GetUniqueCreditCardQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetUniqueCreditCardQuery,
    Types.GetUniqueCreditCardQueryVariables
  >(GetUniqueCreditCardDocument, options);
}
export type GetUniqueCreditCardQueryHookResult = ReturnType<typeof useGetUniqueCreditCardQuery>;
export type GetUniqueCreditCardLazyQueryHookResult = ReturnType<
  typeof useGetUniqueCreditCardLazyQuery
>;
export type GetUniqueCreditCardSuspenseQueryHookResult = ReturnType<
  typeof useGetUniqueCreditCardSuspenseQuery
>;
export type GetUniqueCreditCardQueryResult = Apollo.QueryResult<
  Types.GetUniqueCreditCardQuery,
  Types.GetUniqueCreditCardQueryVariables
>;
export const AllCreditCardLimitDocument = gql`
  query allCreditCardLimit($accountId: ID!) {
    allCreditCardsLimit: calcManyCreditCardLimit(where: { accountId: $accountId }) {
      limit
      limitFree
      limitBlocked
      creditCard {
        id
        name
      }
    }
  }
`;

/**
 * __useAllCreditCardLimitQuery__
 *
 * To run a query within a React component, call `useAllCreditCardLimitQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreditCardLimitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreditCardLimitQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useAllCreditCardLimitQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.AllCreditCardLimitQuery,
    Types.AllCreditCardLimitQueryVariables
  > &
    ({ variables: Types.AllCreditCardLimitQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.AllCreditCardLimitQuery, Types.AllCreditCardLimitQueryVariables>(
    AllCreditCardLimitDocument,
    options,
  );
}
export function useAllCreditCardLimitLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AllCreditCardLimitQuery,
    Types.AllCreditCardLimitQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.AllCreditCardLimitQuery, Types.AllCreditCardLimitQueryVariables>(
    AllCreditCardLimitDocument,
    options,
  );
}
export function useAllCreditCardLimitSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.AllCreditCardLimitQuery,
        Types.AllCreditCardLimitQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.AllCreditCardLimitQuery,
    Types.AllCreditCardLimitQueryVariables
  >(AllCreditCardLimitDocument, options);
}
export type AllCreditCardLimitQueryHookResult = ReturnType<typeof useAllCreditCardLimitQuery>;
export type AllCreditCardLimitLazyQueryHookResult = ReturnType<
  typeof useAllCreditCardLimitLazyQuery
>;
export type AllCreditCardLimitSuspenseQueryHookResult = ReturnType<
  typeof useAllCreditCardLimitSuspenseQuery
>;
export type AllCreditCardLimitQueryResult = Apollo.QueryResult<
  Types.AllCreditCardLimitQuery,
  Types.AllCreditCardLimitQueryVariables
>;
export const CreateCreditCardDocument = gql`
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
export type CreateCreditCardMutationFn = Apollo.MutationFunction<
  Types.CreateCreditCardMutation,
  Types.CreateCreditCardMutationVariables
>;

/**
 * __useCreateCreditCardMutation__
 *
 * To run a mutation, you first call `useCreateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreditCardMutation, { data, loading, error }] = useCreateCreditCardMutation({
 *   variables: {
 *      name: // value for 'name'
 *      limit: // value for 'limit'
 *      brand: // value for 'brand'
 *      account: // value for 'account'
 *   },
 * });
 */
export function useCreateCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateCreditCardMutation,
    Types.CreateCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateCreditCardMutation,
    Types.CreateCreditCardMutationVariables
  >(CreateCreditCardDocument, options);
}
export type CreateCreditCardMutationHookResult = ReturnType<typeof useCreateCreditCardMutation>;
export type CreateCreditCardMutationResult = Apollo.MutationResult<Types.CreateCreditCardMutation>;
export type CreateCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCreditCardMutation,
  Types.CreateCreditCardMutationVariables
>;
export const DeleteCreditCardDocument = gql`
  mutation deleteCreditCard($id: ID!) {
    deleteOneCreditCard(where: { id: $id }) {
      id
      name
      deletedAt
    }
  }
`;
export type DeleteCreditCardMutationFn = Apollo.MutationFunction<
  Types.DeleteCreditCardMutation,
  Types.DeleteCreditCardMutationVariables
>;

/**
 * __useDeleteCreditCardMutation__
 *
 * To run a mutation, you first call `useDeleteCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCreditCardMutation, { data, loading, error }] = useDeleteCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteCreditCardMutation,
    Types.DeleteCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteCreditCardMutation,
    Types.DeleteCreditCardMutationVariables
  >(DeleteCreditCardDocument, options);
}
export type DeleteCreditCardMutationHookResult = ReturnType<typeof useDeleteCreditCardMutation>;
export type DeleteCreditCardMutationResult = Apollo.MutationResult<Types.DeleteCreditCardMutation>;
export type DeleteCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteCreditCardMutation,
  Types.DeleteCreditCardMutationVariables
>;
export const UpdateCreditCardDocument = gql`
  mutation updateCreditCard(
    $id: ID!
    $name: String!
    $limit: Float!
    $brand: CreditCardBrand!
    $account: String!
  ) {
    updateOneCreditCard(
      where: { id: $id }
      data: { name: $name, limit: $limit, brand: $brand, accountId: $account }
    ) {
      id
      name
    }
  }
`;
export type UpdateCreditCardMutationFn = Apollo.MutationFunction<
  Types.UpdateCreditCardMutation,
  Types.UpdateCreditCardMutationVariables
>;

/**
 * __useUpdateCreditCardMutation__
 *
 * To run a mutation, you first call `useUpdateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreditCardMutation, { data, loading, error }] = useUpdateCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      limit: // value for 'limit'
 *      brand: // value for 'brand'
 *      account: // value for 'account'
 *   },
 * });
 */
export function useUpdateCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateCreditCardMutation,
    Types.UpdateCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateCreditCardMutation,
    Types.UpdateCreditCardMutationVariables
  >(UpdateCreditCardDocument, options);
}
export type UpdateCreditCardMutationHookResult = ReturnType<typeof useUpdateCreditCardMutation>;
export type UpdateCreditCardMutationResult = Apollo.MutationResult<Types.UpdateCreditCardMutation>;
export type UpdateCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateCreditCardMutation,
  Types.UpdateCreditCardMutationVariables
>;
export const RestoreCreditCardDocument = gql`
  mutation restoreCreditCard($id: ID!) {
    restoreOneCreditCard(where: { id: $id }) {
      id
      name
    }
  }
`;
export type RestoreCreditCardMutationFn = Apollo.MutationFunction<
  Types.RestoreCreditCardMutation,
  Types.RestoreCreditCardMutationVariables
>;

/**
 * __useRestoreCreditCardMutation__
 *
 * To run a mutation, you first call `useRestoreCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreCreditCardMutation, { data, loading, error }] = useRestoreCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreCreditCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RestoreCreditCardMutation,
    Types.RestoreCreditCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RestoreCreditCardMutation,
    Types.RestoreCreditCardMutationVariables
  >(RestoreCreditCardDocument, options);
}
export type RestoreCreditCardMutationHookResult = ReturnType<typeof useRestoreCreditCardMutation>;
export type RestoreCreditCardMutationResult =
  Apollo.MutationResult<Types.RestoreCreditCardMutation>;
export type RestoreCreditCardMutationOptions = Apollo.BaseMutationOptions<
  Types.RestoreCreditCardMutation,
  Types.RestoreCreditCardMutationVariables
>;
export const GetOperationsDocument = gql`
  query getOperations(
    $startDateTime: DateTime!
    $where: OperationWhereInput
    $orderBy: [OperationOrderByInput!]
    $accountId: String!
  ) {
    operations: findManyOperation(where: $where, orderBy: $orderBy) {
      ...OperationFields
    }
    balance: calcPreviousBalance(where: { paidAt: { lt: $startDateTime }, accountId: $accountId }) {
      amount
    }
  }
  ${OperationFieldsFragmentDoc}
`;

/**
 * __useGetOperationsQuery__
 *
 * To run a query within a React component, call `useGetOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOperationsQuery({
 *   variables: {
 *      startDateTime: // value for 'startDateTime'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetOperationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetOperationsQuery,
    Types.GetOperationsQueryVariables
  > &
    ({ variables: Types.GetOperationsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetOperationsQuery, Types.GetOperationsQueryVariables>(
    GetOperationsDocument,
    options,
  );
}
export function useGetOperationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetOperationsQuery,
    Types.GetOperationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetOperationsQuery, Types.GetOperationsQueryVariables>(
    GetOperationsDocument,
    options,
  );
}
export function useGetOperationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetOperationsQuery, Types.GetOperationsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetOperationsQuery, Types.GetOperationsQueryVariables>(
    GetOperationsDocument,
    options,
  );
}
export type GetOperationsQueryHookResult = ReturnType<typeof useGetOperationsQuery>;
export type GetOperationsLazyQueryHookResult = ReturnType<typeof useGetOperationsLazyQuery>;
export type GetOperationsSuspenseQueryHookResult = ReturnType<typeof useGetOperationsSuspenseQuery>;
export type GetOperationsQueryResult = Apollo.QueryResult<
  Types.GetOperationsQuery,
  Types.GetOperationsQueryVariables
>;
export const UpdateOperationDocument = gql`
  mutation updateOperation(
    $id: ID!
    $name: String!
    $categoryId: String
    $accountId: String!
    $type: TransactionType!
    $value: Float!
    $isPaid: Boolean!
    $paidAt: DateTime!
    $creditCardId: String
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
        creditCardId: $creditCardId
      }
    ) {
      id
      name
      value
      type
      accountId
      categoryId
      isPaid
      paidAt
      creditCardId
    }
  }
`;
export type UpdateOperationMutationFn = Apollo.MutationFunction<
  Types.UpdateOperationMutation,
  Types.UpdateOperationMutationVariables
>;

/**
 * __useUpdateOperationMutation__
 *
 * To run a mutation, you first call `useUpdateOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOperationMutation, { data, loading, error }] = useUpdateOperationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      categoryId: // value for 'categoryId'
 *      accountId: // value for 'accountId'
 *      type: // value for 'type'
 *      value: // value for 'value'
 *      isPaid: // value for 'isPaid'
 *      paidAt: // value for 'paidAt'
 *      creditCardId: // value for 'creditCardId'
 *   },
 * });
 */
export function useUpdateOperationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateOperationMutation,
    Types.UpdateOperationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdateOperationMutation, Types.UpdateOperationMutationVariables>(
    UpdateOperationDocument,
    options,
  );
}
export type UpdateOperationMutationHookResult = ReturnType<typeof useUpdateOperationMutation>;
export type UpdateOperationMutationResult = Apollo.MutationResult<Types.UpdateOperationMutation>;
export type UpdateOperationMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateOperationMutation,
  Types.UpdateOperationMutationVariables
>;
export const DeleteOperationDocument = gql`
  mutation deleteOperation($id: ID!) {
    deleteOneOperation(where: { id: $id }) {
      id
      name
    }
  }
`;
export type DeleteOperationMutationFn = Apollo.MutationFunction<
  Types.DeleteOperationMutation,
  Types.DeleteOperationMutationVariables
>;

/**
 * __useDeleteOperationMutation__
 *
 * To run a mutation, you first call `useDeleteOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOperationMutation, { data, loading, error }] = useDeleteOperationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOperationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteOperationMutation,
    Types.DeleteOperationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.DeleteOperationMutation, Types.DeleteOperationMutationVariables>(
    DeleteOperationDocument,
    options,
  );
}
export type DeleteOperationMutationHookResult = ReturnType<typeof useDeleteOperationMutation>;
export type DeleteOperationMutationResult = Apollo.MutationResult<Types.DeleteOperationMutation>;
export type DeleteOperationMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteOperationMutation,
  Types.DeleteOperationMutationVariables
>;
export const RestoreOperationDocument = gql`
  mutation restoreOperation($id: ID!) {
    restoreOneOperation(where: { id: $id }) {
      id
      name
    }
  }
`;
export type RestoreOperationMutationFn = Apollo.MutationFunction<
  Types.RestoreOperationMutation,
  Types.RestoreOperationMutationVariables
>;

/**
 * __useRestoreOperationMutation__
 *
 * To run a mutation, you first call `useRestoreOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreOperationMutation, { data, loading, error }] = useRestoreOperationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreOperationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RestoreOperationMutation,
    Types.RestoreOperationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RestoreOperationMutation,
    Types.RestoreOperationMutationVariables
  >(RestoreOperationDocument, options);
}
export type RestoreOperationMutationHookResult = ReturnType<typeof useRestoreOperationMutation>;
export type RestoreOperationMutationResult = Apollo.MutationResult<Types.RestoreOperationMutation>;
export type RestoreOperationMutationOptions = Apollo.BaseMutationOptions<
  Types.RestoreOperationMutation,
  Types.RestoreOperationMutationVariables
>;
export const CreateOperationDocument = gql`
  mutation createOperation($type: TransactionType!, $accountID: String!, $paidAt: DateTime!) {
    createOneOperation(
      data: {
        type: $type
        accountId: $accountID
        paidAt: $paidAt
        name: ""
        isPaid: false
        value: 0
      }
    ) {
      id
      name
    }
  }
`;
export type CreateOperationMutationFn = Apollo.MutationFunction<
  Types.CreateOperationMutation,
  Types.CreateOperationMutationVariables
>;

/**
 * __useCreateOperationMutation__
 *
 * To run a mutation, you first call `useCreateOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOperationMutation, { data, loading, error }] = useCreateOperationMutation({
 *   variables: {
 *      type: // value for 'type'
 *      accountID: // value for 'accountID'
 *      paidAt: // value for 'paidAt'
 *   },
 * });
 */
export function useCreateOperationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateOperationMutation,
    Types.CreateOperationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateOperationMutation, Types.CreateOperationMutationVariables>(
    CreateOperationDocument,
    options,
  );
}
export type CreateOperationMutationHookResult = ReturnType<typeof useCreateOperationMutation>;
export type CreateOperationMutationResult = Apollo.MutationResult<Types.CreateOperationMutation>;
export type CreateOperationMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateOperationMutation,
  Types.CreateOperationMutationVariables
>;
export const PaymentMethodsDocument = gql`
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
  ${PaymentMethodFieldsFragmentDoc}
`;

/**
 * __usePaymentMethodsQuery__
 *
 * To run a query within a React component, call `usePaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentMethodsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePaymentMethodsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.PaymentMethodsQuery,
    Types.PaymentMethodsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.PaymentMethodsQuery, Types.PaymentMethodsQueryVariables>(
    PaymentMethodsDocument,
    options,
  );
}
export function usePaymentMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.PaymentMethodsQuery,
    Types.PaymentMethodsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.PaymentMethodsQuery, Types.PaymentMethodsQueryVariables>(
    PaymentMethodsDocument,
    options,
  );
}
export function usePaymentMethodsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.PaymentMethodsQuery,
        Types.PaymentMethodsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.PaymentMethodsQuery, Types.PaymentMethodsQueryVariables>(
    PaymentMethodsDocument,
    options,
  );
}
export type PaymentMethodsQueryHookResult = ReturnType<typeof usePaymentMethodsQuery>;
export type PaymentMethodsLazyQueryHookResult = ReturnType<typeof usePaymentMethodsLazyQuery>;
export type PaymentMethodsSuspenseQueryHookResult = ReturnType<
  typeof usePaymentMethodsSuspenseQuery
>;
export type PaymentMethodsQueryResult = Apollo.QueryResult<
  Types.PaymentMethodsQuery,
  Types.PaymentMethodsQueryVariables
>;
export const PaymentMethodDocument = gql`
  query PaymentMethod($where: PaymentMethodWhereUniqueInput) {
    paymentMethod(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }
  ${PaymentMethodFieldsFragmentDoc}
`;

/**
 * __usePaymentMethodQuery__
 *
 * To run a query within a React component, call `usePaymentMethodQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentMethodQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePaymentMethodQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.PaymentMethodQuery,
    Types.PaymentMethodQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.PaymentMethodQuery, Types.PaymentMethodQueryVariables>(
    PaymentMethodDocument,
    options,
  );
}
export function usePaymentMethodLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.PaymentMethodQuery,
    Types.PaymentMethodQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.PaymentMethodQuery, Types.PaymentMethodQueryVariables>(
    PaymentMethodDocument,
    options,
  );
}
export function usePaymentMethodSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.PaymentMethodQuery, Types.PaymentMethodQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.PaymentMethodQuery, Types.PaymentMethodQueryVariables>(
    PaymentMethodDocument,
    options,
  );
}
export type PaymentMethodQueryHookResult = ReturnType<typeof usePaymentMethodQuery>;
export type PaymentMethodLazyQueryHookResult = ReturnType<typeof usePaymentMethodLazyQuery>;
export type PaymentMethodSuspenseQueryHookResult = ReturnType<typeof usePaymentMethodSuspenseQuery>;
export type PaymentMethodQueryResult = Apollo.QueryResult<
  Types.PaymentMethodQuery,
  Types.PaymentMethodQueryVariables
>;
export const PaymentMethodDeleteOneDocument = gql`
  mutation PaymentMethodDeleteOne($where: PaymentMethodWhereUniqueInput!) {
    paymentMethodDeleteOne(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }
  ${PaymentMethodFieldsFragmentDoc}
`;
export type PaymentMethodDeleteOneMutationFn = Apollo.MutationFunction<
  Types.PaymentMethodDeleteOneMutation,
  Types.PaymentMethodDeleteOneMutationVariables
>;

/**
 * __usePaymentMethodDeleteOneMutation__
 *
 * To run a mutation, you first call `usePaymentMethodDeleteOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodDeleteOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentMethodDeleteOneMutation, { data, loading, error }] = usePaymentMethodDeleteOneMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePaymentMethodDeleteOneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.PaymentMethodDeleteOneMutation,
    Types.PaymentMethodDeleteOneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.PaymentMethodDeleteOneMutation,
    Types.PaymentMethodDeleteOneMutationVariables
  >(PaymentMethodDeleteOneDocument, options);
}
export type PaymentMethodDeleteOneMutationHookResult = ReturnType<
  typeof usePaymentMethodDeleteOneMutation
>;
export type PaymentMethodDeleteOneMutationResult =
  Apollo.MutationResult<Types.PaymentMethodDeleteOneMutation>;
export type PaymentMethodDeleteOneMutationOptions = Apollo.BaseMutationOptions<
  Types.PaymentMethodDeleteOneMutation,
  Types.PaymentMethodDeleteOneMutationVariables
>;
export const PaymentMethodRestoreOneDocument = gql`
  mutation PaymentMethodRestoreOne($where: PaymentMethodWhereUniqueInput!) {
    paymentMethodRestoreOne(where: $where) {
      data {
        ...PaymentMethodFields
      }
    }
  }
  ${PaymentMethodFieldsFragmentDoc}
`;
export type PaymentMethodRestoreOneMutationFn = Apollo.MutationFunction<
  Types.PaymentMethodRestoreOneMutation,
  Types.PaymentMethodRestoreOneMutationVariables
>;

/**
 * __usePaymentMethodRestoreOneMutation__
 *
 * To run a mutation, you first call `usePaymentMethodRestoreOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodRestoreOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentMethodRestoreOneMutation, { data, loading, error }] = usePaymentMethodRestoreOneMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePaymentMethodRestoreOneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.PaymentMethodRestoreOneMutation,
    Types.PaymentMethodRestoreOneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.PaymentMethodRestoreOneMutation,
    Types.PaymentMethodRestoreOneMutationVariables
  >(PaymentMethodRestoreOneDocument, options);
}
export type PaymentMethodRestoreOneMutationHookResult = ReturnType<
  typeof usePaymentMethodRestoreOneMutation
>;
export type PaymentMethodRestoreOneMutationResult =
  Apollo.MutationResult<Types.PaymentMethodRestoreOneMutation>;
export type PaymentMethodRestoreOneMutationOptions = Apollo.BaseMutationOptions<
  Types.PaymentMethodRestoreOneMutation,
  Types.PaymentMethodRestoreOneMutationVariables
>;
export const PaymentMethodCreateOneDocument = gql`
  mutation PaymentMethodCreateOne($input: PaymentMethodCreateInput!) {
    paymentMethodCreateOne(input: $input) {
      data {
        ...PaymentMethodFields
      }
    }
  }
  ${PaymentMethodFieldsFragmentDoc}
`;
export type PaymentMethodCreateOneMutationFn = Apollo.MutationFunction<
  Types.PaymentMethodCreateOneMutation,
  Types.PaymentMethodCreateOneMutationVariables
>;

/**
 * __usePaymentMethodCreateOneMutation__
 *
 * To run a mutation, you first call `usePaymentMethodCreateOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodCreateOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentMethodCreateOneMutation, { data, loading, error }] = usePaymentMethodCreateOneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentMethodCreateOneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.PaymentMethodCreateOneMutation,
    Types.PaymentMethodCreateOneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.PaymentMethodCreateOneMutation,
    Types.PaymentMethodCreateOneMutationVariables
  >(PaymentMethodCreateOneDocument, options);
}
export type PaymentMethodCreateOneMutationHookResult = ReturnType<
  typeof usePaymentMethodCreateOneMutation
>;
export type PaymentMethodCreateOneMutationResult =
  Apollo.MutationResult<Types.PaymentMethodCreateOneMutation>;
export type PaymentMethodCreateOneMutationOptions = Apollo.BaseMutationOptions<
  Types.PaymentMethodCreateOneMutation,
  Types.PaymentMethodCreateOneMutationVariables
>;
export const PaymentMethodUpdateOneDocument = gql`
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
  ${PaymentMethodFieldsFragmentDoc}
`;
export type PaymentMethodUpdateOneMutationFn = Apollo.MutationFunction<
  Types.PaymentMethodUpdateOneMutation,
  Types.PaymentMethodUpdateOneMutationVariables
>;

/**
 * __usePaymentMethodUpdateOneMutation__
 *
 * To run a mutation, you first call `usePaymentMethodUpdateOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentMethodUpdateOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentMethodUpdateOneMutation, { data, loading, error }] = usePaymentMethodUpdateOneMutation({
 *   variables: {
 *      input: // value for 'input'
 *      paymentMethodUpdateOneId: // value for 'paymentMethodUpdateOneId'
 *   },
 * });
 */
export function usePaymentMethodUpdateOneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.PaymentMethodUpdateOneMutation,
    Types.PaymentMethodUpdateOneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.PaymentMethodUpdateOneMutation,
    Types.PaymentMethodUpdateOneMutationVariables
  >(PaymentMethodUpdateOneDocument, options);
}
export type PaymentMethodUpdateOneMutationHookResult = ReturnType<
  typeof usePaymentMethodUpdateOneMutation
>;
export type PaymentMethodUpdateOneMutationResult =
  Apollo.MutationResult<Types.PaymentMethodUpdateOneMutation>;
export type PaymentMethodUpdateOneMutationOptions = Apollo.BaseMutationOptions<
  Types.PaymentMethodUpdateOneMutation,
  Types.PaymentMethodUpdateOneMutationVariables
>;
export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<Types.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;
export const ChangeUserPasswordDocument = gql`
  mutation changeUserPassword($oldPassword: String!, $newPassword: String!) {
    changeUserPassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
export type ChangeUserPasswordMutationFn = Apollo.MutationFunction<
  Types.ChangeUserPasswordMutation,
  Types.ChangeUserPasswordMutationVariables
>;

/**
 * __useChangeUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserPasswordMutation, { data, loading, error }] = useChangeUserPasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangeUserPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ChangeUserPasswordMutation,
    Types.ChangeUserPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ChangeUserPasswordMutation,
    Types.ChangeUserPasswordMutationVariables
  >(ChangeUserPasswordDocument, options);
}
export type ChangeUserPasswordMutationHookResult = ReturnType<typeof useChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationResult =
  Apollo.MutationResult<Types.ChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ChangeUserPasswordMutation,
  Types.ChangeUserPasswordMutationVariables
>;
