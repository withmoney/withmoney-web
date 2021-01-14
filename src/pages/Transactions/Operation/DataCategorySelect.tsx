import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useCategories } from '../../../hooks/useCategories';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';

type Props = {
  CategoryId: string;
};

export const DataCategorySelect = ({ CategoryId }: Props) => {
  const { allCategories } = useOperationsFilters();
  const handleLoadOptions = useCategories();

  const loadOptions = debounce((value: string, callback: any) => {
    handleLoadOptions(value).then((results: any) => callback(results));
  }, 400);
  const defaultOptions = allCategories;
  const defaultValue = defaultOptions?.find((option: any) => option.value === CategoryId);

  // @ts-ignore
  const handleOnCreateOption = (value: string) => console.log('handleOnCreateOption', value);

  return (
    <AsyncCreatableSelect
      defaultOptions
      defaultValue={defaultValue}
      aria-label="Category search"
      loadOptions={loadOptions}
      placeholder="Category Select"
      onCreateOption={handleOnCreateOption}
    />
  );
};
