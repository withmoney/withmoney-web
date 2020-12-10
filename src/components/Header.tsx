import styled from 'styled-components';
import Text from '../components/Text';

type Props = {
  as?: 'h1' | 'h2' | 'h3';
  align?: 'center' | 'left' | 'right';
};

const Header = styled(Text)<Props>`
  color: ${({ variation = 'default' }) => `var(--text-${variation}-color)`};
  font-size: ${({ as = 'default' }) => `var(--font-${as})`};
  font-weight: ${({ as = 'default' }) => `var(--font-${as}-weight)`};
  line-height: ${({ as = 'default' }) => `var(--font-${as}-line-height)`};
  text-align: ${({ as }) => as};
`;

export default Header;
