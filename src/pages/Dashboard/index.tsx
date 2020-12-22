import React from 'react';
import { PlayGround, Operations, NavBar, Container, Sidebar } from './Dashboard.styles';

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <PlayGround>
        <NavBar />
        <Operations />
      </PlayGround>
    </Container>
  );
};

export default Dashboard;
