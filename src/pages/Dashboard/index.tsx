import React from 'react';
import Content from './Content';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Wrapper from './Wrapper';
import Page from './Page';

const Dashboard = () => {
  return (
    <Page>
      <SideBar />
      <Wrapper>
        <NavBar />
        <Content />
      </Wrapper>
    </Page>
  );
};

export default Dashboard;
