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

  return (
    <MenuContainer>
      <MenuContent>
        <ButtonLink onClick={() => menuIsOpen(false)} to="/">
          Profile
        </ButtonLink>
        <ButtonLink onClick={() => menuIsOpen(false)} to="/">
          Change Password
        </ButtonLink>
        <ButtonLink onClick={() => menuIsOpen(false)} to="/accounts">
          Accounts
        </ButtonLink>
      </MenuContent>
      <Button onClick={LogOut}>Log out</Button>
    </MenuContainer>
  );
};

export default Menu;
