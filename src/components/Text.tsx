import styled from 'styled-components';

type Props = {
  variation?: Variations;
  align?: 'center' | 'left' | 'right';
  font?: 'sm' | 'md' | 'lg' | 'xl';
  bold?: boolean;
};

type Variations = 'primary' | 'danger' | 'light' | 'white' | 'default';

const Text = styled.p<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  text-align: ${({ align }) => align};
  font-size: ${({ font = 'md' }) => `var(--text-font-${font})`};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  margin: 0;
`;

export default Text;
