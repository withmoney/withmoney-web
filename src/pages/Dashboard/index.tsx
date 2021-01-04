import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import { useSidebarCollapse } from '../../hooks/useSidebarCollapse';

const Dashboard = () => {
  const { isSidebarOpen } = useSidebarCollapse();

  return (
    <DashboardContainer>
      <Wrapper>
        <NavBar />
        <Content>
          <SideBar />
          <Operations isSidebarOpen={isSidebarOpen}>
            <OperationsContent>
              <span>oi</span>
            </OperationsContent>
          </Operations>
        </Content>
      </Wrapper>
    </DashboardContainer>
  );
};

type OperationsProps = {
  isSidebarOpen: boolean;
};

const Operations = styled.div<OperationsProps>`
  height: 100%;
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '0')};
  transition: margin-left 0.2s ease-out;
  padding: 0 15px;
`;

const OperationsContent = styled.div`
  height: 100%;
`;

const DashboardContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 15px;
  position: relative;
`;

export default Dashboard;
