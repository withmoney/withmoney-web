import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useOperationsFilters } from './useOperationsFilters';
import { ALL_CATEGORY, RESTORE_CATEGORY, GET_ONE_CATEGORY } from '../graphql/Categories';
import { CATEGORY_SEARCH, CREATE_CATEGORY, DELETE_CATEGORY } from '../graphql/Categories';
import { UPDATE_CATEGORY } from '../graphql/Categories';
import { Category } from '../models';

export function useCategories(options?: any) {
  return useQuery(ALL_CATEGORY, options);
}

export const useFilterCategories = () => {
  const client = useApolloClient();
  const { currentTransactionType } = useOperationsFilters();

  async function filterCategory(value: string) {
    const { data } = await client.query({
      query: CATEGORY_SEARCH,
      variables: { name: value, type: currentTransactionType },
    });

    if (data?.findManyCategory.data) {
      return data.findManyCategory.data.map((category: Category) => ({
        value: category.id,
        label: category.name,
      }));
    }

    return [];
  }

  return filterCategory;
};

type CategoryData = {
  createOneCategory: Category;
};

export function useCreateCategory() {
  const [createCategory, { data, error, loading }] = useMutation<CategoryData>(CREATE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORY }],
  });
  return { createCategory, data, loading, error };
}

export function useDeleteCategory() {
  const [deleteCategory, { data, error, loading }] = useMutation<CategoryData>(DELETE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORY }],
  });
  return { deleteCategory, data, loading, error };
}

export function useRestoreCategory() {
  const [restoreCategory, { data, error, loading }] = useMutation<CategoryData>(RESTORE_CATEGORY, {
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
