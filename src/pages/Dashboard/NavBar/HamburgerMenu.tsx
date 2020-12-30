import React from 'react';
import Text from '../../../components/Text';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import { MenuContainer, MeuButton, Menu } from './styles/HamburgerMenu.styles';

const HamburgerMenu = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarCollapse();
  return (
    <MenuContainer isSidebarOpen={isSidebarOpen}>
      <MeuButton>
        <Menu active={isSidebarOpen} onClick={toggleSidebar} title="withmoney" />
      </MeuButton>
      {isSidebarOpen && <Text font="lg">withmoney</Text>}
    </MenuContainer>
  );
};

export default HamburgerMenu;
