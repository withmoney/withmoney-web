import React from 'react';
import styled from 'styled-components';

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

const Calcs = styled.div`
  margin: 15px;
  width: calc(100wv - 300px);
  height: 100%;
  background-color: #ffffff;
`;

const Operations = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #e5e5e5;
`;

const NavBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #d6d6d6;
`;

export default Dashboard;
