import styled from 'styled-components';

type TextProps = {
  variation?: Variations;
  rouded?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Button = styled.button<TextProps>`
  color: ${({ variation = 'default' }) => `var(--button-color-${variation})`};
  background-color: ${({ variation = 'default' }) => `var(--button-background-color-${variation})`};
  font-size: 16px;
  border: solid 2px ${({ variation = 'default' }) => `var(--button-border-${variation})`};
  padding: 11px 13px;
  border-radius: ${({ rouded }) => (rouded ? '37px' : '5px')};
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  outline: none;

  &:hover {
    background-color: ${({ variation = 'default' }) =>
      `var(--button-background-color-hover-${variation})`};
    border: solid 2px
      ${({ variation = 'default' }) =>
        variation === 'default' ? `var(--button-border-hover-${variation})` : 'none'};
  }

  &:active {
    background-color: ${({ variation = 'default' }) =>
      variation === 'default' ? `var(--button-background-color-active-${variation})` : 'none'};
    border: solid 2px
      ${({ variation = 'default' }) =>
        variation === 'default' ? `var(--button-border-active-${variation})` : 'none'};
  }

  &:focus {
    background-color: ${({ variation = 'default' }) =>
      `var(--button-background-color-focus-${variation})`};
    border: solid 2px
      ${({ variation = 'default' }) =>
        variation === 'default' ? `var(--button-border-focus-${variation})` : 'none'};
    box-shadow: 0px 0px 0px 2px
      ${({ variation = 'default' }) => `var(--button-box-shadow-focus-${variation})`};
  }

  &:disabled {
    color: ${({ variation = 'default' }) => `var(--button-color-disabled-${variation})`};
    background-color: ${({ variation = 'default' }) =>
      `var(--button-background-color-disabled-${variation})`};
    border: solid 2px
      ${({ variation = 'default' }) =>
        variation === 'default' ? `var(--button-border-disabled-${variation})` : 'none'};
  }
`;

export default Button;
