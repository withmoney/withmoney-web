import React from 'react';
import styled from 'styled-components';
import Content from './Content';
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
          <Miolo isSidebarOpen={isSidebarOpen}>
            <MioloContent>
              <span>oi</span>
            </MioloContent>
          </Miolo>
        </Content>
      </Wrapper>
    </DashboardContainer>
  );
};

type MioloProps = {
  isSidebarOpen: boolean;
};

const Miolo = styled.div<MioloProps>`
  height: 100%;
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '0')};
  transition: margin-left 0.2s ease-out;
  padding: 15px;
`;

const MioloContent = styled.div`
  background-color: red;
  height: 100%;
`;

const DashboardContainer = styled.div`
  display: flex;
`;

export default Dashboard;
