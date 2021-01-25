import { CSSProperties } from 'react';
const customStyles = {
  container: (provided: CSSProperties, state: any) => ({
    ...provided,
    height: '42px',
    minWidth: '100px',
    borderRadius: 'var(--input-border-radius)',
    border: state.isFocused
      ? '2px solid var(--input-border-color-focus)'
      : '2px solid var(--input-border-color)',
    fontSize: 'var(--font-default)',
    boxShadow: state.isFocused ? '0 0 0 2px var(--input-box-shadow)' : '',
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
    color: 'var(--text-default-color) !important',
    border: 'none',
  }),
  menu: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    boxShadow: '0 0 0 1px #b4b4b4',
    borderRadius: '0 0 4px 4px',
    margin: 0,
    padding: 0,
    border: 'none',
  }),
  menuList: (provided: CSSProperties, state?: any) => ({
    maxHeight: state.maxHeight || 'none',
    padding: 0,
    overflow: 'auto',
    border: 'none',
  }),
  option: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: state.isSelected && 'var(--text-default-color)',
    background: state.isSelected ? '#ececec' : 'white',
    border: 'none',
  }),
  placeholder: (provided: CSSProperties, state: any) => ({
    ...provided,
    minWidth: '150px',
  }),
};

export default customStyles;
