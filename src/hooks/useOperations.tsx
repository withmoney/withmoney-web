import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useOperationsFilters } from './useOperationsFilters';
import { GET_OPERATIONS, UPDATE_OPERATION } from '../graphql/Operations';
import { Data } from '../models';

export function useOperations() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();

  const [getOperations, operationData] = useLazyQuery<Data>(GET_OPERATIONS);

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

  if (!currentAccountId) return { data: undefined, loading: true };

  return operationData;
}

export function useUpdateOperation() {
  const { currentDateTime, currentAccountId } = useOperationsFilters();
  const [upDateOperation, { data, error }] = useMutation<Data>(UPDATE_OPERATION, {
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
  return { upDateOperation, data, error };
}
