import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import NProgress from 'nprogress';
import { useOperationsFilters } from './useOperationsFilters';
import { useAccountFilters } from './useAccountFilters';
import { UPDATE_OPERATION, RESTORE_OPERATION } from '../graphql/Operations';
import { DELETE_OPERATION, GET_OPERATIONS, CREATE_OPERATION } from '../graphql/Operations';
import { Operation } from '../models';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

type Data = {
  operations: Operation[];
};

export function useOperations() {
  const { currentAccountId } = useAccountFilters();
  const { currentDateTime } = useOperationsFilters();

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
  const { currentDateTime } = useOperationsFilters();
  const { currentAccountId } = useAccountFilters();

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
  const { currentDateTime } = useOperationsFilters();
  const { currentAccountId } = useAccountFilters();

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
  const { currentDateTime } = useOperationsFilters();
  const { currentAccountId } = useAccountFilters();

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

export function useCreateOperation() {
  const { currentDateTime } = useOperationsFilters();
  const { currentAccountId } = useAccountFilters();
  const [createOperation, { data, error, loading }] = useMutation(CREATE_OPERATION, {
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

  return { createOperation, data, error, loading };
}
