import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useFilterCategories, useCreateCategory } from '../../../hooks/useCategories';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { useUpdateOperation } from '../../../hooks/useOperations';
import customStyles from './style/CategorySelect.style';
import Input from '../../../components/Input';
import { ALL_CATEGORY } from '../../../graphql/Categories';
import { Data, Operation, Category } from '../../../models';

type Props = {
  CategoryId: string;
  OperationData: Operation;
};

type Option = {
  value: string;
  label: string;
};

const CategorySelect = ({ CategoryId, OperationData }: Props) => {
  const [value, setValue] = useState<Option | undefined>();
  const { data: allCategories, loading } = useQuery<Data>(ALL_CATEGORY);
  const { currentTransactionType } = useOperationsFilters();
  const { createCategory } = useCreateCategory();
  const { updateOperation } = useUpdateOperation();
  const filterCategory = useFilterCategories();

  const loadOptions = debounce((value: string, callback: any) => {
    filterCategory(value).then((results: Option[]) => callback(results));
  }, 400);

  const create = (value: string) => {
    createCategory({
      variables: { name: value, type: currentTransactionType },
    })
      .then(({ data }: any) => {
        const CategoryID = data.createOneCategory;
        try {
          updateOperation({
            variables: {
              id: OperationData.id,
              name: OperationData.name,
              type: OperationData.type,
              accountId: OperationData.account.id,
              categoryId: CategoryID.id,
              value: OperationData.value,
              isPaid: OperationData.isPaid,
              paidAt: OperationData.paidAt,
            },
          });
          setValue({ value: data.createOneCategory.id, label: data.createOneCategory.name });
        } catch (err) {
          toast.error(err.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const update = (data: any) => {
    if (CategoryId !== data.value) {
      try {
        updateOperation({
          variables: {
            id: OperationData.id,
            name: OperationData.name,
            type: OperationData.type,
            accountId: OperationData.account.id,
            categoryId: data.value,
            value: OperationData.value,
            isPaid: OperationData.isPaid,
            paidAt: OperationData.paidAt,
          },
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const defaultValues = allCategories?.me.categories
    .map((category) => ({
      value: category.id,
      label: category.name,
    }))
    .filter((category: Option) => category.value === CategoryId);

  const defaultOptions = allCategories?.me.categories
    .filter((option: Category) => option.type === currentTransactionType)
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
      aria-label="Category search"
      loadOptions={loadOptions}
      placeholder="Category Select"
      onCreateOption={create}
      styles={customStyles}
      onChange={update}
    />
  );
};

export default CategorySelect;
