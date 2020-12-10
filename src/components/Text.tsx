import styled from 'styled-components';

type Props = {
  variation?: Variations;
};

type Variations = 'primary' | 'danger' | 'light';

const Text = styled.p<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
`;

export default Text;
