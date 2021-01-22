import styled from 'styled-components';

type Props = {
  isSidebarOpen: boolean;
};

export const Container = styled.div<Props>`
  background-color: var(--dashboard-color-white);
  margin-right: 15px;
  width: 300px;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? '0' : '-300px')};
  transition: left 0.2s ease-out;
  position: absolute;
  height: 100%;
`;
