import React from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDownMenu';
import MonthNavigation from './MonthNavigation';
import HamburgerMenu from './HamburgerMenu';

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

const NavBarContainer = styled.div`
  display: flex;
  padding: 5px;
  background-color: var(--dashboard-color-white);
`;

const NavBarSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dashboard-color-white);
`;

export default NavBar;
