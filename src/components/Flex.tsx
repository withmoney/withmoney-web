import styled from 'styled-components';

export type Props = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  isFullHeight?: boolean;
};

const Flex = styled.div<Props>`
  display: flex;
  height: ${({ isFullHeight }) => (isFullHeight ? '100vh' : null)};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  & + & {
    margin-top: 20px;
  }
`;

export default Flex;
