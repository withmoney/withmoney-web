import styled from 'styled-components';

export type Props = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
};

const Flex = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  & + & {
    margin-top: 20px;
  }
`;

export default Flex;
