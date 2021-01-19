import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import nprogress from 'nprogress';
import { useOperationsFilters } from './useOperationsFilters';
import { GET_OPERATIONS, UPDATE_OPERATION } from '../graphql/Operations';
import { Data } from '../models';

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
      nprogress.start();
    } else {
      nprogress.done();
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
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [loading]);

  return { updateOperation, data, error };
}
