import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { Content, ChangePage } from './style/Operations.style';
import Transactions from '../../Transactions';

const ContentPage = () => {
  const { isSidebarOpen } = useSidebarCollapse();

  return (
    <Content isSidebarOpen={isSidebarOpen}>
      <ChangePage>
        <Page />
      </ChangePage>
    </Content>
  );
};

const Page = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Transactions} />
    </Switch>
  );
};

export default ContentPage;
