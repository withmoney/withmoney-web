import React from 'react';
import DropDownMenu from './DropDownMenu';
import MonthNavigation from './MonthNavigation';
import HamburgerMenu from './HamburgerMenu';
import { NavBarContainer, NavBarSection } from './style/index.style';

type Props = {
  isLoading: boolean;
};

const NavBar = ({ isLoading }: Props) => {
  return (
    <NavBarContainer>
      <HamburgerMenu />
      <NavBarSection>
        <MonthNavigation isLoading={isLoading} />
        <DropDownMenu />
      </NavBarSection>
    </NavBarContainer>
  );
};

export default NavBar;
