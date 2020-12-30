import React from 'react';
import Text from '../../../components/Text';
import { useSideHide } from '../../../hooks/useSideHide';
import { MenuContainer, MeuButton, Menu } from './styles/HamburgerMenu.styles';

const HamburgerMenu = () => {
  const { sideHide, setSideHide } = useSideHide();
  return (
    <MenuContainer show={sideHide}>
      <MeuButton>
        <Menu active={sideHide} onClick={() => setSideHide(!sideHide)} title="withmoney" />
      </MeuButton>
      {sideHide ? '' : <Text font="lg">withmoney</Text>}
    </MenuContainer>
  );
};

export default HamburgerMenu;
