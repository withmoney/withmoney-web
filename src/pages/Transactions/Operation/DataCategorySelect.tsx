import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useCategories } from '../../../hooks/useCategories';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';

type Props = {
  CategoryId: string;
};

export const DataCategorySelect = ({ CategoryId }: Props) => {
  const { allCategories } = useOperationsFilters();
  const handleLoadOptions = useCategories();

  const loadOptions = (value: string) => handleLoadOptions(value);
  const defaultOptions = allCategories;
  const defaultValue = defaultOptions?.find((option: any) => option.value === CategoryId);

  return (
    <AsyncCreatableSelect
      defaultOptions
      defaultValue={defaultValue}
      aria-label="Category search"
      loadOptions={loadOptions}
      placeholder="Category Select"
    />
  );
};
