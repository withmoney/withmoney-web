import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  variation?: 'primary' | 'danger' | 'light';
  align?: 'center' | 'left' | 'right';
};

const Link = styled(RouterLink)<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ variation = 'default' }) => `var(--text-${variation}-color-hover)`};
  }
  &:active {
    color: ${({ variation = 'default' }) => `var(--text-${variation}-color-active)`};
  }
`;

export default Link;
