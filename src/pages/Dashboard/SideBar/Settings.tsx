import React from 'react';
import { useLocation } from 'react-router-dom';
import Text from '../../../components/Text';
import { Accounts, CreditCard, Categories } from './style/Menu.style';
import { MenuSettings, MenuButton, TextContainer } from './style/Menu.style';

const Settings = () => {
  const { pathname } = useLocation();
  return (
    <MenuSettings>
      <TextContainer>
        <Text>Settings</Text>
      </TextContainer>
      <MenuButton open={pathname === '/accounts'} to="/accounts">
        <Accounts />
        <Text>Accounts</Text>
      </MenuButton>
      <MenuButton open={pathname === '/categories'} to="/categories">
        <Categories />
        <Text>Categories</Text>
      </MenuButton>
      <MenuButton open={pathname === '/credit-cards'} to="/credit-cards">
        <CreditCard />
        <Text>Credit Cards</Text>
      </MenuButton>
    </MenuSettings>
  );
};

export default Settings;
