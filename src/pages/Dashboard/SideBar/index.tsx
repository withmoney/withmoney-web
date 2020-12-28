import React from 'react';
import styled from 'styled-components';
import HamburgerMenu from './HamburgerMenu';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';

const SideBar = () => {
  return (
    <Container>
      <HamburgerMenu />
      <Balance />
      <Information />
      <Menu />
    </Container>
  );
};

export const Container = styled.div`
  background-color: var(--dashboard-color-grey);
`;

export default SideBar;
