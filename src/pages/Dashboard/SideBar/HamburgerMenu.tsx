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
  margin-right: 10px;
  width: var(--dashboard-icon-size);
  color: var(--dashboard-icon-color);
  &:hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  padding: 5px 25px;
  align-items: center;
  background-color: var(--dashboard-color-white);
  margin-bottom: 15px;
  border-right: 2px solid var(--dashboard-border-color);
`;

export default HamburgerMenu;
