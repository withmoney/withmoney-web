import React from 'react';
import styled from 'styled-components';
import HamburgerMenu from './HamburgerMenu';
import Balance from './Balance';
import Information from './Information';
import ResourcesList from './ResourcesList';

const SideBar = () => {
  return (
    <Container>
      <HamburgerMenu />
      <Balance />
      <Information />
      <ResourcesList />
    </Container>
  );
};

export const Container = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #e5e5e5;
`;

export default SideBar;
