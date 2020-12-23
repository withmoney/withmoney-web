import styled from 'styled-components';

type Props = {
  variation?: Variations;
  align?: 'center' | 'left' | 'right';
  margin?: string;
  font?: 'sm' | 'md' | 'lg' | 'xl';
  bold?: boolean;
};

type Variations = 'primary' | 'danger' | 'light' | 'default';

const Text = styled.p<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  text-align: ${({ align }) => align};
  margin: ${({ margin = '0' }) => margin};
  font-size: ${({ font = 'md' }) => `var(--text-font-${font})`};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export default Text;
