import styled from 'styled-components';

type Props = {
  align?: 'center' | 'flex-end' | 'space-between' | 'space-around';
};

const Flex = styled.div<Props>`
  display: flex;
  justify-content: ${({ align = 'flex-start' }) => align};
  & + & {
    margin-top: 20px;
  }
`;

export default Flex;
