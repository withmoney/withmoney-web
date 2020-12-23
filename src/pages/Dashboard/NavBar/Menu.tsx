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

  return (
    <MenuContainer show={show}>
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
  margin: 0 25px;
  border-bottom: solid 2px #e7e7e7;
  margin: 20px;
  ${Link} {
    margin-bottom: 20px;
  }
`;

const MenuContainer = styled.div<Props>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 55px;
  right: 10px;
  width: 270px;
  height: 170px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${Button} {
    position: absolute;
    right: 25px;
    bottom: 15px;
  }
`;

export default Menu;
