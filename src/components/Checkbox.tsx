import styled from 'styled-components';

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: var(--check-box-size);
  height: var(--check-box-size);
  background: var(--check-box-inactive-color);
  border: 2px solid var(--check-box-border-color);
  border-radius: var(--check-box-border-radius);
  margin: 0;
  outline: 0;
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--check-box-color-hover);
  }

  /* --- Checkbox icon --- */
  &:after {
    content: '';
    position: absolute;
    left: var(--check-box-position-icon-left);
    top: var(--check-box-position-icon-top);
    transition: transform 0.2s ease, opacity 0.2s;
    width: var(--check-box-after-horizontal);
    height: var(--check-box-after-vertical);
    border: 2px solid var(--check-box-border-color-after);
    border-top: 0;
    border-left: 0;
    transform: var(--check-box-after-transform);
    opacity: 0;
  }

  /* --- Checkbox states --- */
  &:checked {
    background: var(--button-primary-background-color);
    border-color: var(--button-primary-background-color);
    :after {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: default;
    background: var(--check-box-border-background-color-disabled);
    border-color: var(--check-box-border-color-disabled);
    &:checked:after {
      border-color: var(--check-box-border-color-disabled-after);
    }
  }
`;

export default Checkbox;
