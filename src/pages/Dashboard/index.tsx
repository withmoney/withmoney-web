import React from 'react';
import { Calcs, Operations, NavBar, Container, Sidebar } from './Dashboard.styles';

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <Operations>
        <NavBar />
        <Calcs />
      </Operations>
    </Container>
  );
};

export default Dashboard;
