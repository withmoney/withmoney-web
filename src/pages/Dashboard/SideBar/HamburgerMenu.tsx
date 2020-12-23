import React from 'react';
import styled from 'styled-components';
import { Menu as Icon } from '@styled-icons/material';
import Text from '../../../components/Text';

const HamburgerMenu = () => {
  return (
    <MenuContainer>
      <Menu title="Withmoney" />
      <Text font="lg">Withmoney</Text>
    </MenuContainer>
  );
};

const Menu = styled(Icon)`
  margin: 10px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  max-height: 50px;
  align-items: center;
  background-color: #ffff;
  margin-bottom: 15px;
  border-right: solid 2px #f2f2f2;
`;

export default HamburgerMenu;
