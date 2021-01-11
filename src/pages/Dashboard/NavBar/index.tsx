import React from 'react';
import DropDownMenu from './DropDownMenu';
import MonthNavigation from './MonthNavigation';
import HamburgerMenu from './HamburgerMenu';
import { NavBarContainer, NavBarSection, ContentNav } from './style/index.style';
import AccountSelector from './AccountSelector';

const NavBar = () => {
  return (
    <NavBarContainer>
      <HamburgerMenu />
      <NavBarSection>
        <MonthNavigation />
        <ContentNav>
          <AccountSelector />
          <DropDownMenu />
        </ContentNav>
      </NavBarSection>
    </NavBarContainer>
  );
};

export default NavBar;
