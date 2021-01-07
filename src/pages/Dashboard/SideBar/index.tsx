import React from 'react';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { Container } from './style/index.style';

type Props = {
  balance: number;
};

const SideBar = ({ balance }: Props) => {
  const { isSidebarOpen } = useSidebarCollapse();
  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <Balance balance={balance} />
      <Information />
      <Menu />
    </Container>
  );
};

export default SideBar;
