import React, { useState, useRef } from 'react';
import Menu from './Menu';
import Text from '../../../components/Text';
import useClickOutSide from '../../../hooks/useClickOutSide';
import {
  DropDownMenuContent,
  DropDownMenuButton,
  Avatar,
  MenuContainer,
} from './Styles/DropDownMenu styles';

const data = { fistName: 'User', lastName: 'Name', image: '' };
const API = 'https://ui-avatars.com/api/?name=';

const DropDownMenu = () => {
  const ref = useRef();
  const [MenuOpen, setMenuOpen] = useState(false);
  useClickOutSide(ref, () => setMenuOpen(false));

  const getDefaultImage = () => {
    const AVATAR = API + `${data.fistName}+${data.lastName}`;
    return AVATAR;
  };

  return (
    <DropDownMenuContent>
      <DropDownMenuButton isActive={MenuOpen} onClick={() => setMenuOpen(true)}>
        <Avatar src={getDefaultImage()} />
        <Text>
          {data.fistName} {data.lastName}
        </Text>
      </DropDownMenuButton>
      <MenuContainer ref={ref}>{MenuOpen ? <Menu /> : ''}</MenuContainer>
    </DropDownMenuContent>
  );
};

export default DropDownMenu;
