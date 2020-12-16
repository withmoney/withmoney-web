import styled from 'styled-components';

interface Props {
  show?: boolean;
}

const Container = styled.div<Props>`
  display: ${({ show }) => (show ? 'none' : '')};
  padding-left: 15px;
  padding-right: 15px;
`;

export default Container;
