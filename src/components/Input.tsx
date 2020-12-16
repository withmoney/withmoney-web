import styled from 'styled-components';

type Props = {
  invalid?: boolean;
};

const Input = styled.input<Props>`
  font-size: var(--font-default);
  width: 100%;
  border-radius: var(--input-border-radius);
  border: 2px solid
    ${({ invalid }) => (invalid ? `var(--input-border-color-danger)` : `var(--input-border-color)`)};
  padding: var(--input-padding-vertical) var(--input-padding-horizontal);
  margin-bottom: var(--input-margin-bottom);
  outline: none;

  &:hover {
    border-color: var(--input-border-color-hover);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--input-box-shadow);
    border-color: var(--input-border-color-focus);
  }

  &:active {
    border-color: var(--input-border-color-active);
  }

  &:disabled {
    border-color: var(--input-border-color-disabled);
    background-color: var(--input-disabled-background-color);
  }
`;

export default Input;
