import styled from 'styled-components';

export type Props = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
};

const Flex = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  & + & {
    margin-top: 20px;
  }
`;

export default Flex;
