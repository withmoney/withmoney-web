import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import HideProvider from '../../hooks/useHide';
//dashboard
const Dashboard = () => {
  return (
    <DashboardContainer>
      <HideProvider>
        <Wrapper>
          <NavBar />
          <Content>
            <SideBar />
          </Content>
        </Wrapper>
      </HideProvider>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

export default Dashboard;
