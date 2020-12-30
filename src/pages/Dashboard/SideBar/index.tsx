import React from 'react';
import Balance from './Balance';
import Information from './Information';
import Menu from './Menu';
import { useSideHide } from '../../../hooks/useSideHide';
import { Container } from './styles/index styles';

const SideBar = () => {
  const { sideHide } = useSideHide();
  return (
    <Container hide={sideHide}>
      <Balance />
      <Information />
      <Menu />
    </Container>
  );
};

export default SideBar;
