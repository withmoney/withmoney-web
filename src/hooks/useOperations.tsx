import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import NProgress from 'nprogress';
import { useOperationsFilters } from './useOperationsFilters';
import { UPDATE_OPERATION, RESTORE_OPERATION } from '../graphql/Operations';
import { DELETE_OPERATION, GET_OPERATIONS } from '../graphql/Operations';
import { Data } from '../models';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export function useOperations() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();
  const [getOperations, operationData] = useLazyQuery<Data>(GET_OPERATIONS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (currentAccountId) {
      getOperations({
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccountId,
        },
      });
    }
  }, [currentAccountId, currentDateTime]);

  useEffect(() => {
    if (operationData.loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [operationData.loading]);

  if (!currentAccountId) return { data: undefined, loading: true };

  return operationData;
}

export function useUpdateOperation() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();
  const [updateOperation, { data, error, loading }] = useMutation<Data>(UPDATE_OPERATION, {
    refetchQueries: [
      {
        query: GET_OPERATIONS,
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccountId,
        },
      },
    ],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { updateOperation, data, error };
}

export function useDeleteOperation() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();
  const [deleteOperation, { data, error, loading }] = useMutation(DELETE_OPERATION, {
    refetchQueries: [
      {
        query: GET_OPERATIONS,
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccountId,
        },
      },
    ],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { deleteOperation, data, loading, error };
}

export function useRestoreOperation() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();
  const [restoreOperation, { data, error, loading }] = useMutation(RESTORE_OPERATION, {
    refetchQueries: [
      {
        query: GET_OPERATIONS,
        variables: {
          startDateTime: currentDateTime?.startOf('month'),
          endDateTime: currentDateTime?.endOf('month'),
          accountId: currentAccountId,
        },
      },
    ],
  });

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return { restoreOperation, data, error, loading };
}
