import React, { useState, useRef } from 'react';
import Menu from './Menu';
import Text from '../../../components/Text';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { useUser } from '../../../hooks/useUser';
import { DropDownMenuContent, DropDownMenuButton } from './style/DropDownMenu.style';
import { Avatar, MenuContainer } from './style/DropDownMenu.style';

const API = 'https://ui-avatars.com/api/?background=E7E7E7&color=363636&name=';

const DropDownMenu = () => {
  const ref = useRef();
  const { data } = useUser();
  const [MenuOpen, setMenuOpen] = useState(false);
  useClickOutSide(ref, () => setMenuOpen(false));

  const getDefaultImage = () => {
    const AVATAR = API + `${data?.me.firstName}+${data?.me.lastName}`;
    return AVATAR;
  };

  return (
    <DropDownMenuContent>
      <DropDownMenuButton isActive={MenuOpen} onClick={() => setMenuOpen(true)}>
        <Avatar src={getDefaultImage()} />
        <Text>
          {data?.me.firstName} {data?.me.lastName}
        </Text>
      </DropDownMenuButton>
      <MenuContainer ref={ref}>{MenuOpen ? <Menu /> : ''}</MenuContainer>
    </DropDownMenuContent>
  );
};

export default DropDownMenu;
