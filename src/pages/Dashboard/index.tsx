import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SideBar />
      <Wrapper>
        <NavBar />
        <Content />
      </Wrapper>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

export default Dashboard;
