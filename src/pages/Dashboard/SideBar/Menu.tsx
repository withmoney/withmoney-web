import React, { useState } from 'react';
import Text from '../../../components/Text';
import { MenuContainer, MenuButton, Money, MoneyOff } from './styles/Menu.styles';

const Menu = () => {
  const [activeDashboard, setActiveDashboard] = useState(true);
  const [activeReports, setActiveReports] = useState(false);

  return (
    <MenuContainer>
      <MenuButton
        onClick={() => {
          setActiveDashboard(true);
          setActiveReports(false);
        }}
        isActive={activeDashboard}
        to="/dashboard"
      >
        <Money />
        <Text>Dashboard</Text>
      </MenuButton>
      <MenuButton
        onClick={() => {
          setActiveReports(true);
          setActiveDashboard(false);
        }}
        isActive={activeReports}
        to="/reports"
      >
        <MoneyOff />
        <Text>Reports</Text>
      </MenuButton>
    </MenuContainer>
  );
};

export default Menu;
