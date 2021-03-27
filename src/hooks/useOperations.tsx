import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { useAccountFilters } from './useAccountFilters';
import { UPDATE_OPERATION, RESTORE_OPERATION } from 'graphql/Operations';
import { DELETE_OPERATION, GET_OPERATIONS, CREATE_OPERATION } from 'graphql/Operations';
import { ALL_CREDIT_CARDS_LIMIT } from 'graphql/CreditCard';
import { Operations } from 'models';
import useNProgress from './useNProgress';

export function useOperations() {
  const { currentAccount } = useAccountFilters();
  const { currentDateTime } = useOperationsFilters();

  const [getOperations, { data, loading, error }] = useLazyQuery<Operations>(GET_OPERATIONS);

  useEffect(() => {
    if (currentAccount) {
      getOperations({
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccount?.id,
        },
      });
    }
  }, [currentAccount, currentDateTime]);

  useNProgress(loading);

  if (!currentAccount) return { data: undefined, loading: true };

  return { getOperations, data, loading, error };
}

export function useUpdateOperation() {
  const { currentDateTime } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();

  const [updateOperation, { data, error, loading }] = useMutation<Operations>(UPDATE_OPERATION, {
    refetchQueries: [
      { query: ALL_CREDIT_CARDS_LIMIT, variables: { accountId: currentAccount?.id } },
      {
        query: GET_OPERATIONS,
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccount?.id,
        },
      },
    ],
  });

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
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
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
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
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
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccount?.id,
        },
      },
    ],
  });

  useNProgress(loading);

  return { createOperation, data, error, loading };
}
