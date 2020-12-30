import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import SideHideProvider from '../../hooks/useSideHide';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SideHideProvider>
        <Wrapper>
          <NavBar />
          <Content>
            <SideBar />
          </Content>
        </Wrapper>
      </SideHideProvider>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

export default Dashboard;
