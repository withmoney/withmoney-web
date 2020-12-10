import styled from 'styled-components';

type Props = {
  variation?: 'primary' | 'light' | 'danger';
};

const Header = styled.text<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
`;

export default Header;
