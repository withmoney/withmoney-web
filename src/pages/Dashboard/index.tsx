import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSidebarCollapse } from '../../hooks/useSidebarCollapse';
import { Content, Page, Wrapper } from './style/Operations.style';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Operations from './Operations';
import Reports from './Reports';
import Accounts from './Accounts';
import Categories from './Categories';
import AddAccount from './Accounts/AddAccount';
import AddCategory from './Categories/AddCategory';
import UpdateAccount from './Accounts/UpdateAccount';
import UpdateCategory from './Categories/UpdateCategory';

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
            <Route path="/categories" component={Categories} />
            <Route path="/accounts-new" component={AddAccount} />
            <Route path="/category-new" component={AddCategory} />
            <Route path="/accounts-edit/:id" component={UpdateAccount} />
            <Route path="/category-edit/:id" component={UpdateCategory} />
          </Switch>
        </Content>
      </Wrapper>
    </Page>
  );
};

export default Dashboard;
