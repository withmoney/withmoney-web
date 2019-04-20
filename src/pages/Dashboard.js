import React from 'react';
import { Helmet } from 'react-helmet';
import TableTransactions from 'components/TableTransactions';
import HeaderPage from 'components/HeaderPage';
import InOutPercent from 'components/InOutPercent';
import AccountTotal from 'components/AccountTotal';

const Dashboard = () => (
  <div className="page">
    <Helmet>
      <title>Dashboard</title>
      <body className="page-dashboard" />
    </Helmet>
    <HeaderPage />
    <div className="page-wrapper">
      <div className="page-content">
        <TableTransactions />
      </div>
      <div className="page-sidebar">
        <AccountTotal />
        <InOutPercent />
      </div>
    </div>
  </div>
);

export default Dashboard;
