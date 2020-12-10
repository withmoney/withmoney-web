import styled from 'styled-components';
import Text from '../components/Text';

type Props = {
  as?: 'h1' | 'h2' | 'h3';
};

const Header = styled(Text)<Props>`
  font-size: ${({ as = 'default' }) => `var(--font-${as})`};
  font-weight: ${({ as = 'default' }) => `var(--font-${as}-weight)`};
  line-height: ${({ as = 'default' }) => `var(--font-${as}-line-height)`};
`;

export default Header;
