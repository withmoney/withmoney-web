import { CSSProperties } from 'react';
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
    color: 'var(--text-default-color) !important',
  }),
  menu: (provided: CSSProperties, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    boxShadow: '0 0 0 1px #b4b4b4',
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
    color: state.isSelected && 'var(--text-default-color)',
    background: state.isSelected ? '#ececec' : 'white',
  }),
};

export default customStyles;
