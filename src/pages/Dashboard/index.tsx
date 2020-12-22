import React from 'react';
import { Wrapper, Content, NavBar, Sidebar, Page } from './Dashboard.styles';

const Dashboard = () => {
  return (
    <Page>
      <Sidebar />
      <Wrapper>
        <NavBar />
        <Content />
      </Wrapper>
    </Page>
  );
};

export default Dashboard;
