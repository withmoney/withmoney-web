import styled from 'styled-components';
import Text from '../components/Text';

type Props = {
  as?: 'h1' | 'h2' | 'h3';
  margin?: string;
};

const Header = styled(Text)<Props>`
  font-size: ${({ as = 'default' }) => `var(--font-${as})`};
  font-weight: ${({ as = 'default' }) => `var(--font-${as}-weight)`};
  line-height: ${({ as = 'default' }) => `var(--font-${as}-line-height)`};
  margin-top: ${({ as = 'default' }) => `var(--font-${as}-margin-top)`};
  margin-bottom: ${({ as = 'default' }) => `var(--font-${as}-margin-bottom)`};
  margin: ${({ margin = null }) => margin};
`;

export default Header;
