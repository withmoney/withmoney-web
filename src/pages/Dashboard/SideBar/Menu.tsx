import React from 'react';
import Text from '../../../components/Text';
import { MenuContainer, MenuButton, Money, MoneyOff } from './styles/Menu.styles';

const Menu = () => {
  return (
    <MenuContainer>
      <MenuButton>
        <Money />
        <Text>Transition</Text>
      </MenuButton>
      <MenuButton>
        <MoneyOff />
        <Text>Reports</Text>
      </MenuButton>
    </MenuContainer>
  );
};

export default Menu;
