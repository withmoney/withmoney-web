import React from 'react';
import DropDownMenu from './DropDownMenu';
import MonthNavigation from './MonthNavigation';
import HamburgerMenu from './HamburgerMenu';
import { NavBarContainer, NavBarSection } from './style/index.style';

const NavBar = () => {
  return (
    <NavBarContainer>
      <HamburgerMenu />
      <NavBarSection>
        <MonthNavigation />
        <DropDownMenu />
      </NavBarSection>
    </NavBarContainer>
  );
};

export default NavBar;
