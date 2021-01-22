import { useApolloClient, useMutation } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { CATEGORY_SEARCH, CREATE_CATEGORY, ALL_CATEGORY } from '../graphql/Categories';
import { Me, Category } from '../models';

type Data = {
  me: Me;
};

export const useFilterCategories = () => {
  const client = useApolloClient();
  const { currentTransactionType } = useOperationsFilters();

  async function filterCategory(value: string) {
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

  return filterCategory;
};

type CreateOneCategoryMutationData = {
  createOneCategory: Category;
};

export function useCreateCategory() {
  const [createCategory, { data, error }] = useMutation<CreateOneCategoryMutationData>(
    CREATE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORY }],
    },
  );
  return { createCategory, data, error };
}
