import React from 'react';
import styled from 'styled-components';
import { Menu as MenuIcon } from '@styled-icons/material';
import Text from '../../../components/Text';
import { useHide } from '../../../hooks/useHide';

const HamburgerMenu = () => {
  const { hideSideBar, setHideSideBar } = useHide();
  return (
    <MenuContainer>
      <MeuButton>
        <Menu onClick={() => setHideSideBar(!hideSideBar)} title="withmoney" />
      </MeuButton>
      <Text font="lg">Withmoney</Text>
    </MenuContainer>
  );
};

const Menu = styled(MenuIcon)`
  width: var(--dashboard-icon-size);
  color: var(--dashboard-icon-color);
  &:hover {
    cursor: pointer;
  }
`;

const MeuButton = styled.button`
  margin-right: 25px;
  background-color: var(--dashboard-color-white);
  padding: 0;
  outline: none;
  border: none;
`;

const MenuContainer = styled.div`
  display: flex;
  padding-right: 95px;
  padding-left: 15px;
  align-items: center;
  background-color: var(--dashboard-color-white);
  border-right: 2px solid var(--dashboard-border-color);
`;

export default HamburgerMenu;
