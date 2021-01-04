import styled from 'styled-components';

type OperationsProps = {
  isSidebarOpen: boolean;
};

export const Content = styled.div<OperationsProps>`
  height: 100%;
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '0')};
  transition: margin-left 0.2s ease-out;
  padding: 0 15px;
`;

export const ChangePage = styled.div`
  height: 100%;
`;
