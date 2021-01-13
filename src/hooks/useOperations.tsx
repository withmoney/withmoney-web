import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { GET_OPERATIONS, CATEGORY_SEARCH } from '../graphql/AuthGql';
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

export function useCategories() {
  const client = useApolloClient();
  const { currentTransactionType } = useOperationsFilters();

  async function handleLoadOptions(value: string) {
    const { data } = await client.query<Data>({
      query: CATEGORY_SEARCH,
      variables: { name: value, type: currentTransactionType },
    });

    if (data?.me) {
      const categories = data.me.categories.map((category) => category.name);
      return categories;
    }

    return [];
  }

  return handleLoadOptions;
}
