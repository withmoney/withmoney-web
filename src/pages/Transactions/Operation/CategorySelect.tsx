import React, { CSSProperties } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useCategories } from '../../../hooks/useCategories';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';

type Props = {
  CategoryId: string;
};

export const CategorySelect = ({ CategoryId }: Props) => {
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
      styles={customStyles}
    />
  );
};

const customStyles = {
  container: (provided: CSSProperties, state: any) => ({
    ...provided,
    borderRadius: 'var(--input-border-radius)',
    border: '2px solid var(--input-border-color)',
    fontSize: 'var(--font-default)',
  }),
  control: (provided: CSSProperties) => ({
    ...provided,
    border: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: CSSProperties) => ({
    ...provided,
    color: '#CED0DA !important',
  }),
  menu: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    boxShadow: '0 0 0 1px #DFE3E9',
    borderRadius: '0 0 4px 4px',
    margin: 0,
    padding: 0,
  }),
  menuList: (provided: CSSProperties, state?: any) => ({
    maxHeight: state.maxHeight || 'none',
    padding: 0,
    overflow: 'auto',
  }),
  option: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: state.isSelected && '#2E5BFF',
    background: state.isSelected ? '#EAEFFF' : 'white',
    boxShadow: '0 -1px 0 #DFE3E9',
  }),
};
