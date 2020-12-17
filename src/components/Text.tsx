import styled from 'styled-components';

type Props = {
  variation?: Variations;
  align?: 'center' | 'left' | 'right';
  margin?: string;
};

type Variations = 'primary' | 'danger' | 'light';

const Text = styled.p<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  text-align: ${({ align }) => align};
  margin: ${({ margin = '0' }) => margin};
`;

export default Text;
