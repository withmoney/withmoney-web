import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import ContentPage from './Operations/ContentPage';
import { useOperations } from '../../hooks/useOperations';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Wrapper>
        <NavBar />
        <Content>
          <SideBar />
          <ContentPage />
        </Content>
      </Wrapper>
    </DashboardContainer>
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
