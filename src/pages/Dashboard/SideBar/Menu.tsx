import React, { useState } from 'react';
import Text from '../../../components/Text';
import { MenuContainer, MenuButton, Money, MoneyOff } from './style/Menu.style';

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <MenuContainer>
      <MenuButton
        onClick={() => setActiveMenu('Dashboard')}
        open={activeMenu === 'Dashboard'}
        to="/dashboard"
      >
        <Money />
        <Text>Dashboard</Text>
      </MenuButton>
      <MenuButton
        onClick={() => setActiveMenu('Report')}
        open={activeMenu === 'Report'}
        to="/reports"
      >
        <MoneyOff />
        <Text>Reports</Text>
      </MenuButton>
    </MenuContainer>
  );
};

export default Menu;
