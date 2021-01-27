import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSidebarCollapse } from '../../hooks/useSidebarCollapse';
import { Content, Page, Wrapper } from './style/Operations.style';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Operations from './Operations';
import Reports from './Reports';
import Accounts from './Accounts';
import AddAccount from './Accounts/AddAccount';
import UpdateAccount from './Accounts/UpdateAccount';

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
            <Route path="/accounts" component={Accounts} />
            <Route path="/createAccount" component={AddAccount} />
            <Route path="/updateAccount" component={UpdateAccount} />
          </Switch>
        </Content>
      </Wrapper>
    </Page>
  );
};

export default Dashboard;
