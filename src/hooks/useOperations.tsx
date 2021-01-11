import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useOperationsFilters } from './useOperationsFilters';
import { GET_OPERATIONS } from '../graphql/AuthGql';
import { Me } from '../models';

type Data = {
  me: Me;
};

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
