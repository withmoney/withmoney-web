import React from 'react';
import styled from 'styled-components';
import { Menu as MenuIcon } from '@styled-icons/material';
import Text from '../../../components/Text';

const HamburgerMenu = () => {
  return (
    <MenuContainer>
      <Menu title="withmoney" />
      <Text font="lg">Withmoney</Text>
    </MenuContainer>
  );
};

const Menu = styled(MenuIcon)`
  margin: 10px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #ffff;
  margin-bottom: 15px;
  border-right: 2px solid #f2f2f2;
`;

export default HamburgerMenu;
