import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSidebarCollapse } from '../../hooks/useSidebarCollapse';
import { Content, Page, Wrapper } from './style/Operations.style';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Operations from './Operations';
import Reports from './Reports';

const Dashboard = () => {
  const { isSidebarOpen } = useSidebarCollapse();
  return (
    <Page>
      <NavBar />
      <Wrapper>
        <SideBar />
        <Content isSidebarOpen={isSidebarOpen}>
          <Switch>
            <Route path="/dashboard" component={Operations} />
            <Route path="/reports" component={Reports} />
          </Switch>
        </Content>
      </Wrapper>
    </Page>
  );
};

export default Dashboard;
