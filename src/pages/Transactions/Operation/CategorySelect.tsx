import React from 'react';
import { useQuery } from '@apollo/client';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useFilterCategories, useCreateCategory } from '../../../hooks/useCategories';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { useUpdateOperation } from '../../../hooks/useOperations';
import customStyles from './style/CategorySelect.style';
import { ALL_CATEGORY } from '../../../graphql/Categories';
import { Data, Operation } from '../../../models';

type Props = {
  CategoryId: string;
  OperationData: Operation;
};

const CategorySelect = ({ CategoryId, OperationData }: Props) => {
  const { currentTransactionType } = useOperationsFilters();
  const { data: allCategories } = useQuery<Data>(ALL_CATEGORY);

  const filterCategory = useFilterCategories();

  const loadOptions = debounce((value: string, callback: any) => {
    filterCategory(value).then((results: any) => callback(results));
  }, 400);

  const { createCategory } = useCreateCategory();
  const { upDateOperation } = useUpdateOperation();

  const create = (value: string) => {
    createCategory({
      variables: { name: value, type: currentTransactionType },
    }).then(({ data }: any) => {
      const CategoryID = data.createOneCategory;
      upDateOperation({
        variables: {
          id: OperationData.id,
          name: OperationData.name,
          type: OperationData.type,
          accountId: OperationData.account.id,
          categoryId: CategoryID.id,
          value: OperationData.value,
          isPaid: OperationData.isPaid,
        },
      });
    });
  };

  const update = (data: any) => {
    if (CategoryId === data.value) {
      return data.value;
    } else {
      upDateOperation({
        variables: {
          id: OperationData.id,
          name: OperationData.name,
          type: OperationData.type,
          accountId: OperationData.account.id,
          categoryId: data.value,
          value: OperationData.value,
          isPaid: OperationData.isPaid,
        },
      });
    }
  };

  const defaultValues = allCategories?.me.categories
    .map((category) => ({
      value: category.id,
      label: category.name,
    }))
    .filter((category: any) => category.value === CategoryId);

  const defaultOptions = allCategories?.me.categories
    .filter((option: any) => option.type === currentTransactionType)
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  return (
    <AsyncCreatableSelect
      cacheOptions
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
