import styled from 'styled-components';

export const ArrowButtonContainer = styled.button`
  background-color: var(--dashboard-button-color);
  width: var(--dashboard-button-size);
  height: var(--dashboard-button-size);
  margin-right: 10px;
  border-radius: var(--dashboard-default-radius);
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }

  &:disabled {
    background-color: var(--dashboard-button-color);
    &:hover {
      background-color: var(--dashboard-button-color);
    }
    &:active {
      background-color: var(--dashboard-button-color);
    }
  }
`;
