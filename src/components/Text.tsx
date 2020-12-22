import styled from 'styled-components';

type Props = {
  variation?: Variations;
  align?: 'center' | 'left' | 'right';
  margin?: string;
  weight?: '400' | '500' | '600' | '700' | '800' | '900';
  fontSize?: string;
};

type Variations = 'primary' | 'danger' | 'light' | 'default';

const Text = styled.p<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  text-align: ${({ align }) => align};
  margin: ${({ margin = '0' }) => margin};
  font-weight: ${({ weight = '0' }) => weight};
  font-size: ${({ fontSize = '16px' }) => fontSize};
`;

export default Text;
