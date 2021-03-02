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
    position: absolute;
    opacity: 0;
    top: 7px;
    left: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--check-box-border-color-after);
  }

  /* --- Radio states --- */
  &:checked {
    display: block;
    border: none;
    background: var(--button-primary-background-color);
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
