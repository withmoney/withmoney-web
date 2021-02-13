import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import { MenuContainer, MenuContent, ButtonLink } from './style/Menu.style';

type Props = {
  menuIsOpen: (value: boolean) => void;
};

const Menu = ({ menuIsOpen }: Props) => {
  const history = useHistory();
  const location = useLocation();
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
        <ButtonLink
          className={location.pathname === '/profile' ? 'disabled' : undefined}
          onClick={toggleCloseMenu}
          to="/profile"
        >
          Profile
        </ButtonLink>
        <ButtonLink
          className={location.pathname === '/accounts' ? 'disabled' : undefined}
          onClick={toggleCloseMenu}
          to="/accounts"
        >
          Accounts
        </ButtonLink>
        <ButtonLink
          className={location.pathname === '/categories' ? 'disabled' : undefined}
          onClick={toggleCloseMenu}
          to="/categories"
        >
          Categories
        </ButtonLink>
      </MenuContent>
      <Button onClick={LogOut}>Log out</Button>
    </MenuContainer>
  );
};

export default Menu;
