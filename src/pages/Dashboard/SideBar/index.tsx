import React from 'react';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { Container } from './styles/index.styles';

const SideBar = () => {
  const { isSidebarOpen } = useSidebarCollapse();
  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <Balance />
      <Information />
      <Menu />
    </Container>
  );
};

export default SideBar;
