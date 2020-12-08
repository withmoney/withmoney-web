import styled from 'styled-components';
import theme from '../theme';

type TextProps = {
  variation?: Variations;
  rouded?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Button = styled.button<TextProps>`
  background-color: ${(props) =>
    theme.variants.button.background[props.variation || 'default'].default};
  color: ${(props) => theme.variants.button.color[props.variation || 'default'].default};
  font-size: 16px;
  border: ${(props) => theme.variants.button.border[props.variation || 'default'].default};
  padding: 11px 13px;
  border-radius: ${(props) => (props.rouded ? '37px' : '5px')};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${(props) => theme.variants.button.color[props.variation || 'default'].hover};
    background-color: ${(props) =>
      theme.variants.button.background[props.variation || 'default'].hover};
    border: ${(props) => theme.variants.button.border[props.variation || 'default'].hover};
    box-shadow: ${(props) => theme.variants.button.boxShadow[props.variation || 'default'].hover};
  }

  &:focus {
    color: ${(props) => theme.variants.button.color[props.variation || 'default'].focus};
    background-color: ${(props) =>
      theme.variants.button.background[props.variation || 'default'].focus};
    border: ${(props) => theme.variants.button.border[props.variation || 'default'].focus};
    box-shadow: ${(props) => theme.variants.button.boxShadow[props.variation || 'default'].focus};
  }

  &:active {
    color: ${(props) => theme.variants.button.color[props.variation || 'default'].active};
    background-color: ${(props) =>
      theme.variants.button.background[props.variation || 'default'].active};
    border: ${(props) => theme.variants.button.border[props.variation || 'default'].active};
    box-shadow: ${(props) => theme.variants.button.boxShadow[props.variation || 'default'].active};
  }

  &:disabled {
    color: ${(props) => theme.variants.button.color[props.variation || 'default'].disabled};
    background-color: ${(props) =>
      theme.variants.button.background[props.variation || 'default'].disabled};
    border: ${(props) => theme.variants.button.border[props.variation || 'default'].disabled};
    box-shadow: ${(props) =>
      theme.variants.button.boxShadow[props.variation || 'default'].disabled};
  }
`;

export default Button;
