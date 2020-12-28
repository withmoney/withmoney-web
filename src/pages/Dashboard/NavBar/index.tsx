import React from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDownMenu';
import MonthNavigation from './MonthNavigation';

const NavBar = () => {
  return (
    <NavBarContainer>
      <MonthNavigation />
      <DropDownMenu />
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: var(--dashboard-color-white);
`;

export default NavBar;
