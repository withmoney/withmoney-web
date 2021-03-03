import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { ALL_CATEGORY, RESTORE_CATEGORY, GET_ONE_CATEGORY } from 'graphql/Categories';
import { CREATE_CATEGORY, DELETE_CATEGORY } from 'graphql/Categories';
import { UPDATE_CATEGORY } from 'graphql/Categories';
import { Category, Categories } from 'models';

export function useCategories(options?: any) {
  return useQuery<Categories>(ALL_CATEGORY, options);
}

export const useFilterCategories = () => {
  const client = useApolloClient();
  const { currentTransactionType } = useOperationsFilters();

  async function filterCategory(value: string) {
    const { data } = await client.query<Categories>({
      query: ALL_CATEGORY,
      variables: { name: value, type: currentTransactionType },
    });

    if (data?.categories.data) {
      return data.categories.data.map((category: Category) => ({
        value: category.id,
        label: category.name,
      }));
    }

    return [];
  }

  return filterCategory;
};

export function useCreateCategory() {
  const [createCategory, { data, error, loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [
      {
        query: ALL_CATEGORY,
      },
    ],
  });
  return { createCategory, data, loading, error };
}

export function useDeleteCategory() {
  const [deleteCategory, { data, error, loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORY }],
  });
  return { deleteCategory, data, loading, error };
}

export function useRestoreCategory() {
  const [restoreCategory, { data, error, loading }] = useMutation(RESTORE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORY }],
  });
  return { restoreCategory, data, loading, error };
}

export function useUniqueCategory(id: string) {
  return useQuery(GET_ONE_CATEGORY, { variables: { id } });
}

export const useUpdateCategory = () => {
  const [updateCategory, { data, loading, error }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORY }],
  });

  return { updateCategory, data, loading, error };
};
