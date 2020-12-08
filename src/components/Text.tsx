import styled from 'styled-components';
import theme from '../theme';

type TextProps = {
  variation?: Variations;
  link?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Text = styled.p<TextProps>`
  color: ${(props) => theme.variants.text[props.variation || 'default']};
  text-decoration: ${(props) => (props.link ? 'underline' : 'none')};
`;

export default Text;
