import styled, { css } from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';

type Props = {
  variation?: Variations;
  rounded?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Button = styled.button<Props>`
  color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
  background-color: ${({ variation = 'default' }) => `var(--button-${variation}-background-color)`};
  font-size: var(--font-default);
  border: 2px solid ${({ variation = 'default' }) => `var(--button-${variation}-border)`};
  padding: var(--button-padding-height) var(--button-padding-width);
  border-radius: ${({ rounded }) => (rounded ? '37px' : '5px')};
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  outline: none;

  &:hover {
    background-color: ${({ variation = 'default' }) =>
      `var(--button-${variation}-background-color-hover)`};
    border-color: ${({ variation = 'default' }) => `var(--button-${variation}-border-hover)`};
  }

  &:focus {
    background-color: ${({ variation = 'default' }) =>
      `var(--button-${variation}-background-color-focus)`};
    border-color: ${({ variation = 'default' }) => `var(--button-${variation}-border-focus)`};
    box-shadow: 0 0 0 2px
      ${({ variation = 'default' }) => `var(--button-${variation}-box-shadow-focus)`};
  }

  &:active {
    background-color: ${({ variation = 'default' }) =>
      `var(--button-${variation}-background-color-active)`};
    border-color: ${({ variation = 'default' }) => `var(--button-${variation}-border-active)`};
  }

  &:disabled {
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color-disabled)`};
    background-color: ${({ variation = 'default' }) =>
      `var(--button-${variation}-background-color-disabled)`};
    border-color: ${({ variation = 'default' }) => `var(--button-${variation}-border-disabled)`};
  }

  ${({ rounded }) =>
    rounded &&
    css`
      padding-left: 15px;
      padding-right: 15px;
    `}

  ${StyledIconBase} {
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
    font-size: 16px;
    width: 16px;
  }

  ${StyledIconBase} + span {
    margin-left: 10px;
  }
`;

export default Button;
