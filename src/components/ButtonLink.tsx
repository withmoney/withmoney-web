import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledIconBase } from '@styled-icons/styled-icon';

type Props = {
  variation?: Variations;
  rounded?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Button = styled(Link)<Props>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
  background-color: ${({ variation = 'default' }) => `var(--button-${variation}-background-color)`};
  font-size: var(--font-default);
  border: 2px solid ${({ variation = 'default' }) => `var(--button-${variation}-border)`};
  padding: var(--button-padding-height) var(--button-padding-width);
  border-radius: ${({ rounded }) => (rounded ? '37px' : '5px')};
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
      padding-left: var(--button-rounded-padding);
      padding-right: var(--button-rounded-padding);
    `}

  ${StyledIconBase} {
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
    font-size: --font-default;
    width: var(--button-icon-width);
  }

  ${StyledIconBase} + span {
    margin-left: var(--button-icon-margin);
  }
`;

export default Button;
