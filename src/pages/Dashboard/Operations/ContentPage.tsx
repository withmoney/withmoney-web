import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { Content, ChangePage } from './styles/Operations.styles';
import Entrance from '../../Transactions/Entrance';
import Recurrent from '../../Transactions/Recurrent';
import Credit from '../../Transactions/Credit';
import Unforeseen from '../../Transactions/Unforeseen';
import Reports from '../../Reports';

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
      <Route path="/dashboard" component={Entrance} />
      <Route path="/recurrent" component={Recurrent} />
      <Route path="/credit" component={Credit} />
      <Route path="/unforeseen" component={Unforeseen} />
      <Route path="/reports" component={Reports} />
    </Switch>
  );
};

export default ContentPage;
