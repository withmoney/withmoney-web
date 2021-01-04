import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import { MenuContainer, MenuContent, ButtonLink } from './styles/Menu.styles';

const Menu = () => {
  const history = useHistory();

  const LogOut = () => {
    localStorage.removeItem('withmoney-token');
    history.push('/');
  };

  return (
    <MenuContainer>
      <MenuContent>
        <ButtonLink to="/">Profile</ButtonLink>
        <ButtonLink to="/">Change Password</ButtonLink>
      </MenuContent>
      <Button onClick={LogOut}>Log out</Button>
    </MenuContainer>
  );
};

export default Menu;
