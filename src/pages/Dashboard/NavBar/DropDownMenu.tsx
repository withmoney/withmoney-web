import React, { useState, useRef } from 'react';
import Menu from './Menu';
import Text from '../../../components/Text';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { useUser } from '../../../hooks/useUser';
import { DropDownMenuContent, DropDownMenuButton } from './style/DropDownMenu.style';
import { MenuContainer } from './style/DropDownMenu.style';
import Img from '../../../components/Img';
import LoadingData from '../../../components/LoadingData';

const DropDownMenu = () => {
  const ref = useRef();
  const { data, getDefaultImage } = useUser();
  const [MenuOpen, setMenuOpen] = useState(false);
  useClickOutSide(ref, () => setMenuOpen(false));

  return (
    <DropDownMenuContent>
      <DropDownMenuButton isActive={MenuOpen} onClick={() => setMenuOpen(true)}>
        {getDefaultImage ? (
          <Img size="30px" borderRadius="50%" src={getDefaultImage()} />
        ) : (
          <LoadingData size="30px" />
        )}
        <Text>
          {data?.me.firstName} {data?.me.lastName}
        </Text>
      </DropDownMenuButton>
      <MenuContainer ref={ref}>{MenuOpen ? <Menu menuIsOpen={setMenuOpen} /> : ''}</MenuContainer>
    </DropDownMenuContent>
  );
};

export default DropDownMenu;
