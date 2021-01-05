import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import DateTimeProvider from '../../hooks/useMonthNavigation';
import ContentPage from './Operations/ContentPage';

const Dashboard = () => {
  return (
    <DateTimeProvider>
      <DashboardContainer>
        <Wrapper>
          <NavBar />
          <Content>
            <SideBar />
            <ContentPage />
          </Content>
        </Wrapper>
      </DashboardContainer>
    </DateTimeProvider>
  );
};

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
