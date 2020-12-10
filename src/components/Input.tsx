import styled from 'styled-components';

type Props = {
  isValid?: boolean;
  width?: string;
};

const Input = styled.input<Props>`
  width: ${({ width }) => width};
  font-size: var(--font-default);
  border-radius: var(--input-border-radius);
  border: 2px solid var(--input-border-color);
  padding: var(--input-padding-height) var(--input-padding-width);
  margin-bottom: var(--input-margin-bottom);
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ isValid = true }) =>
        isValid ? `var(--input-box-shadow)` : `var(--input-box-shadow-danger)`};
    border-color: ${({ isValid = true }) =>
      isValid ? `var(--input-border-color-focus)` : `var(--input-border-color-focus-danger)`};
  }

  &:disabled {
    color: var(--input-disabled-color);
  }
`;

export default Input;
