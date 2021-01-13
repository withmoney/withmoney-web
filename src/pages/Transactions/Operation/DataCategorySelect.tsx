import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useCategories } from '../../../hooks/useOperations';

export const DataCategorySelect = () => {
  const handleLoadOptions = useCategories();
  const loadOptions = (value: string) => handleLoadOptions(value);

  return (
    <AsyncCreatableSelect
      defaultOptions
      aria-label="Category search"
      loadOptions={loadOptions}
      placeholder="Category Select"
    />
  );
};
