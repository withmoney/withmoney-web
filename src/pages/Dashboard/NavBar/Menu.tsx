import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Link from '../../../components/Link';
import Button from '../../../components/Button';

type Props = {
  show?: boolean;
};

const Menu = ({ show }: Props) => {
  const history = useHistory();

  const LogOut = () => {
    localStorage.removeItem('withmoney-token');
    history.push('/');
  };

  if (!show) {
    return null;
  }

  return (
    <MenuContainer>
      <MenuContent>
        <Link to="/">Profile</Link>
        <Link to="/">Change Password</Link>
      </MenuContent>
      <Button onClick={LogOut}>Log out</Button>
    </MenuContainer>
  );
};

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  border-bottom: solid 2px var(--dashboard-border-color);
  margin: 20px;
  ${Link} {
    margin-bottom: 20px;
  }
`;

const MenuContainer = styled.div<Props>`
  position: absolute;
  top: 55px;
  right: 10px;
  width: 270px;
  padding-bottom: 50px;
  background-color: var(--dashboard-color-white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${Button} {
    position: absolute;
    right: 18;
    bottom: 14px;
  }
`;

export default Menu;
