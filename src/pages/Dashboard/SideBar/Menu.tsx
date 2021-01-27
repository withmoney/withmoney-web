import React from 'react';
import { useLocation } from 'react-router-dom';
import Text from '../../../components/Text';
import { MenuContainer, MenuButton, Money, MoneyOff } from './style/Menu.style';

const Menu = () => {
  const { pathname } = useLocation();
  return (
    <MenuContainer>
      <MenuButton open={pathname === '/dashboard'} to="/dashboard">
        <Money />
        <Text>Dashboard</Text>
      </MenuButton>
      <MenuButton open={pathname === '/reports'} to="/reports">
        <MoneyOff />
        <Text>Reports</Text>
      </MenuButton>
    </MenuContainer>
  );
};

export default Menu;
