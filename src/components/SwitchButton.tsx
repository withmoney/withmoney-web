import styled from 'styled-components';

const SwitchButton = styled.input.attrs({ type: 'checkbox' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  cursor: pointer;
  outline: none;
  margin: 0;
  height: var(--switch-vertical);
  width: var(--switch-horizontal);
  border: 1px solid var(--switch-border-color-inactive);
  background: var(--switch-background-color-inactive);
  transition: background var(--switch-transition-background-border),
    border-color var(--switch-transition-background-border),
    box-shadow var(--switch-transition-box-shadow);

  border-radius: var(--switch-border-radius);

  &:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--switch-transition-background-border) ease,
      opacity var(--switch-transition-opacity);

    left: var(--switch-position-after);
    top: var(--switch-position-after);
    border-radius: var(--switch-border-radius-after);
    width: var(--switch-position-after-ver-hor);
    height: var(--switch-position-after-ver-hor);
    background: #dbdbdb;
    transform: translateX(0);
  }
  &:checked {
    background: var(--button-primary-background-color);
    border-color: var(--button-primary-background-color);
    :after {
      background: var(--switch-background-color-inactive);
      transform: translateX(17px);
    }
  }
  &:disabled {
    background: var(--switch-background-color-disabled);
    cursor: not-allowed;
    border-color: var(--switch-border-color-disabled);

    & + label {
      cursor: not-allowed;
    }
    &:after {
      background: var(--switch-border-color-disabled-inactive);
    }
    &:checked {
      background: var(--switch-background-color-disabled-checked);
      border-color: var(--switch-border-color-disabled-checked);
      &:after {
        background: var(--switch-border-color-disabled-after);
      }
    }
  }
  &:hover {
    &:not(:checked) {
      &:not(:disabled) {
        background-color: var(--switch-background-color-inactive);
        border-color: var(--switch-border-color-inactive-hover);
      }
    }
  }
`;

export default SwitchButton;
