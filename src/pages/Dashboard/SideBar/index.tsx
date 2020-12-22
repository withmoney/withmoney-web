import React from 'react';
import styled from 'styled-components';
import HamburgerMenu from '../../../components/HamburgerMenu';
import Balance from '../../../components/Balance';
import Information from '../../../components/Information';
import ResourcesList from '../../../components/ResourcesList';

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
