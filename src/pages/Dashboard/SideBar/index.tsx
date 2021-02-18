import React from 'react';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';
import Settings from './Settings';
import CreditCardsInformation from './CreditCardsInformation';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { Container } from './style/index.style';

const SideBar = () => {
  const { isSidebarOpen } = useSidebarCollapse();
  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <Balance />
      <Information />
      <CreditCardsInformation />
      <Menu />
      <Settings />
    </Container>
  );
};

export default SideBar;
