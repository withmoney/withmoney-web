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

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  background-color: var(--page-background-color);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 15px;
  position: relative;
`;
