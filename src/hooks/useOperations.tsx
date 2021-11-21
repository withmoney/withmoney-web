import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { useAccountFilters } from './useAccountFilters';
import { UPDATE_OPERATION, RESTORE_OPERATION } from 'graphql/Operations';
import { DELETE_OPERATION, GET_OPERATIONS, CREATE_OPERATION } from 'graphql/Operations';
import { ALL_CREDIT_CARDS_LIMIT } from 'graphql/CreditCard';
import { Operations, Operation, SortOrder } from 'models';
import useNProgress from './useNProgress';

export function useOperations() {
  const { currentAccount } = useAccountFilters();
  const { currentDateTime, categoryId } = useOperationsFilters();

  const [getOperations, { data, loading, error }] = useLazyQuery<Operations>(GET_OPERATIONS);

  useEffect(() => {
    if (currentAccount) {
      getOperations({
        variables: {
          where: {
            paidAt: {
              gte: currentDateTime?.startOf('month'),
              lte: currentDateTime?.endOf('month'),
            },
            deletedAt: { equals: null },
            accountId: { equals: currentAccount?.id },
            ...(categoryId ? { categoryId: { equals: categoryId } } : {}),
          },
          orderBy: [{ paidAt: SortOrder.ASC }, { createdAt: SortOrder.ASC }],
          startDateTime: currentDateTime?.startOf('month'),
          accountId: currentAccount.id,
        },
      });
    }
  }, [currentAccount, currentDateTime, categoryId]);

  useNProgress(loading);

  if (!currentAccount) return { data: undefined, loading: true };

  return { getOperations, data, loading, error };
}

interface UpdateOperationData {
  updateOneOperation: Operation;
}

export function useUpdateOperation() {
  const { currentAccount } = useAccountFilters();

  const [updateOperation, { data, error, loading }] = useMutation<UpdateOperationData>(
    UPDATE_OPERATION,
    {
      refetchQueries: [
        { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
      ],
    },
  );

  useNProgress(loading);

  return { updateOperation, data, error };
}

export function useDeleteOperation() {
  const { currentDateTime } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();

  const [deleteOperation, { data, error, loading }] = useMutation(DELETE_OPERATION, {
    refetchQueries: [
      { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
      {
        query: GET_OPERATIONS,
        variables: {
          where: {
            paidAt: {
              gte: currentDateTime?.startOf('month'),
              lte: currentDateTime?.endOf('month'),
            },
            deletedAt: { equals: null },
            accountId: { equals: currentAccount?.id },
          },
          orderBy: [{ paidAt: SortOrder.ASC }, { createdAt: SortOrder.ASC }],
          startDateTime: currentDateTime?.startOf('month'),
          accountId: currentAccount?.id,
        },
      },
    ],
  });

  useNProgress(loading);

  return { deleteOperation, data, loading, error };
}

export function useRestoreOperation() {
  const { currentDateTime } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();

  const [restoreOperation, { data, error, loading }] = useMutation(RESTORE_OPERATION, {
    refetchQueries: [
      { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
      {
        query: GET_OPERATIONS,
        variables: {
          where: {
            paidAt: {
              gte: currentDateTime?.startOf('month'),
              lte: currentDateTime?.endOf('month'),
            },
            deletedAt: { equals: null },
            accountId: { equals: currentAccount?.id },
          },
          orderBy: [{ paidAt: SortOrder.ASC }, { createdAt: SortOrder.ASC }],
          startDateTime: currentDateTime?.startOf('month'),
          accountId: currentAccount?.id,
        },
      },
    ],
  });

  useNProgress(loading);

  return { restoreOperation, data, error, loading };
}

export function useCreateOperation() {
  const { currentDateTime } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();
  const [createOperation, { data, error, loading }] = useMutation(CREATE_OPERATION, {
    refetchQueries: [
      { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
      {
        query: GET_OPERATIONS,
        variables: {
          where: {
            paidAt: {
              gte: currentDateTime?.startOf('month'),
              lte: currentDateTime?.endOf('month'),
            },
            deletedAt: { equals: null },
            accountId: { equals: currentAccount?.id },
          },
          orderBy: [{ paidAt: SortOrder.ASC }, { createdAt: SortOrder.ASC }],
          startDateTime: currentDateTime?.startOf('month'),
          accountId: currentAccount?.id,
        },
      },
    ],
  });

  useNProgress(loading);

  return { createOperation, data, error, loading };
}
