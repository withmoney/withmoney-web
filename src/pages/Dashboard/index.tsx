import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useSidebarCollapse } from 'hooks/useSidebarCollapse';

import { Page, Wrapper } from './style/Operations.style';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Operations from './Operations';
import Reports from './Reports';
import ReportsDay from './Reports/ReportsDay';
import ReportsMonth from './Reports/ReportsMonth';
import Accounts from './Accounts';
import Profile from './Profile';
import ProfileUpdate from './ProfileUpdate';
import ChangePassword from './ChangePassword';
import Categories from './Categories';
import AddAccount from './Accounts/AddAccount';
import AddCategory from './Categories/AddCategory';
import UpdateAccount from './Accounts/UpdateAccount';
import UpdateCategory from './Categories/UpdateCategory';
import CreditCards from './CreditCards';
import AddCreditCard from './CreditCards/AddCreditCard';
import UpdateCreditCard from './CreditCards/UpdateCreditCard';

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
            <Route path="/reports-day" component={ReportsDay} />
            <Route path="/reports-month" component={ReportsMonth} />
            <Route path="/profile" component={Profile} />
            <Route path="/profile-update" component={ProfileUpdate} />
            <Route path="/profile-change-password" component={ChangePassword} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/categories" component={Categories} />
            <Route path="/credit-cards" component={CreditCards} />
            <Route path="/accounts-new" component={AddAccount} />
            <Route path="/category-new" component={AddCategory} />
            <Route path="/credit-card-new" component={AddCreditCard} />
            <Route path="/accounts-edit/:id" component={UpdateAccount} />
            <Route path="/category-edit/:id" component={UpdateCategory} />
            <Route path="/credit-cards-edit/:id" component={UpdateCreditCard} />
          </Switch>
        </Content>
      </Wrapper>
    </Page>
  );
};

type OperationsProps = {
  isSidebarOpen: boolean;
};

const Content = styled.div<OperationsProps>`
  height: 100%;
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '0')};
  transition: margin-left 0.2s ease-out;
  padding: 0 15px;
  overflow-x: auto;
`;

export default Dashboard;
