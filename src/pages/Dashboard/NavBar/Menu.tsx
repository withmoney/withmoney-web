import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import { MenuContainer, MenuContent, ButtonLink } from './style/Menu.style';

type Props = {
  menuIsOpen: (value: boolean) => void;
};

const Menu = ({ menuIsOpen }: Props) => {
  const history = useHistory();

  const LogOut = () => {
    localStorage.removeItem('withmoney-token');
    history.push('/');
  };

  const toggleCloseMenu = () => {
    menuIsOpen(false);
  };

  return (
    <MenuContainer>
      <MenuContent>
        <ButtonLink onClick={toggleCloseMenu} to="/">
          Profile
        </ButtonLink>
        <ButtonLink onClick={toggleCloseMenu} to="/">
          Change Password
        </ButtonLink>
        <ButtonLink onClick={toggleCloseMenu} to="/accounts">
          Accounts
        </ButtonLink>
        <ButtonLink onClick={toggleCloseMenu} to="/categories">
          Categories
        </ButtonLink>
      </MenuContent>
      <Button onClick={LogOut}>Log out</Button>
    </MenuContainer>
  );
};

export default Menu;
