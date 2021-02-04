import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import Input from '../../../../components/Input';
import { useFilterCategories, useCreateCategory } from '../../../../hooks/useCategories';
import { useOperationsFilters } from '../../../../hooks/useOperationsFilters';
import { useUpdateOperation } from '../../../../hooks/useOperations';
import { Operation, FindManyCategory } from '../../../../models';
import { ALL_CATEGORY } from '../../../../graphql/Categories';
import customStyles from './style/CategorySelect.style';

type Props = {
  CategoryId: string | null;
  operation: Operation;
};

type Option = {
  value: string;
  label: string;
};

const CategorySelect = ({ CategoryId, operation }: Props) => {
  const [value, setValue] = useState<Option | undefined>();
  const { data: allCategories, loading } = useQuery<FindManyCategory>(ALL_CATEGORY);
  const { currentTransactionType } = useOperationsFilters();
  const { createCategory } = useCreateCategory();
  const { updateOperation } = useUpdateOperation();
  const filterCategory = useFilterCategories();

  const loadOptions = debounce((value: string, callback: any) => {
    filterCategory(value).then((results: Option[]) => callback(results));
  }, 400);

  const create = async (value: string) => {
    try {
      const { data } = await createCategory({
        variables: { name: value, type: currentTransactionType },
      });

      const category = data?.operation;

      if (category) {
        updateOperation({
          variables: {
            ...operation,
            accountId: operation.accountId,
            categoryId: category.id,
          },
        });
        setValue({ value: category.id, label: category.name });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const update = (data: any) => {
    if (CategoryId !== data.value) {
      try {
        updateOperation({
          variables: {
            ...operation,
            accountId: operation.accountId,
            categoryId: data.value,
          },
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const defaultValues = allCategories?.categories.data
    .map((category) => ({
      value: category.id,
      label: category.name,
    }))
    .filter((category) => category.value === CategoryId);

  const defaultOptions = allCategories?.categories.data
    .filter((option) => option.type === currentTransactionType)
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  return loading ? (
    <Input defaultValue="loading" disabled />
  ) : (
    <AsyncCreatableSelect
      cacheOptions
      value={value}
      defaultOptions={defaultOptions}
      defaultValue={defaultValues}
      aria-label="Select or Create"
      loadOptions={loadOptions}
      placeholder="Select or Create"
      onCreateOption={create}
      styles={customStyles}
      onChange={update}
    />
  );
};

export default CategorySelect;
