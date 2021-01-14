import { useApolloClient } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { CATEGORY_SEARCH } from '../graphql/AuthGql';
import { Me } from '../models';

type Data = {
  me: Me;
};

export const useCategories = () => {
  const client = useApolloClient();
  const { currentTransactionType } = useOperationsFilters();

  async function handleLoadOptions(value: string) {
    const { data } = await client.query<Data>({
      query: CATEGORY_SEARCH,
      variables: { name: value, type: currentTransactionType },
    });

    if (data?.me) {
      return data.me.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
    }

    return [];
  }

  return handleLoadOptions;
};
