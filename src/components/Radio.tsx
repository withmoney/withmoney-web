import styled from 'styled-components';

const Radio = styled.input.attrs({ type: 'radio' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: var(--check-box-size);
  height: var(--check-box-size);
  background: var(--radio-inactive-color);
  border: 2px solid var(--radio-border-color);
  border-radius: var(--radio-border-radius);
  margin: 0;
  position: relative;
  outline: none;

  &:hover {
    background: var(--radio-color-hover);
  }

  /* --- Radio icon --- */
  &:after {
    content: '';
    left: var(--radio-position-icon-left);
    top: var(--radio-position-icon-top);
    position: absolute;
    width: var(--radio-after-horizontal);
    height: var(--radio-after-vertical);
    background: var(--radio-background-color-icon);
    transition: opacity 0.2s;
    border-radius: var(--radio-border-radius);
    opacity: 0;
  }

  /* --- Radio states --- */
  &:checked {
    background: var(--button-primary-background-color);
    border: none;
    :after {
      opacity: 1;
    }
  }

  &:disabled {
    background: var(--radio-background-color-disabled);
    border: none;
    &:checked:after {
      background: var(--radio-background-color-disabled-after);
    }
  }
`;

export default Radio;
