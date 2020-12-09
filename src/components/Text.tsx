import styled from 'styled-components';

type TextProps = {
  variation?: Variations;
  link?: boolean;
};

type Variations = 'primary' | 'danger' | 'light';

const Text = styled.p<TextProps>`
  color: ${({ variation = 'default' }) => `var(--text-color-${variation})`};
  text-decoration: ${({ link }) => (link ? 'underline' : 'none')};
  cursor: ${({ link }) => (link ? 'pointer' : '')};
`;

export default Text;
