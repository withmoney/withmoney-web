import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Text from '../../../components/Text';

const data = { fistName: 'User', lastName: 'Name', image: '' };

const DropDownMenu = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const OpenMenu = () => setActiveMenu(!activeMenu);

  const getDefaultImage = () => {
    const URL = `https://ui-avatars.com/api/?name=${data.fistName}+${data.lastName}`;
    return URL;
  };

  return (
    <DropDownMenuButton onClick={OpenMenu}>
      <DropDownMenuContent active={activeMenu}>
        <Avatar src={getDefaultImage()} />
        <Text>
          {data.fistName} {data.lastName}
        </Text>
      </DropDownMenuContent>
      <Menu show={activeMenu} />
    </DropDownMenuButton>
  );
};

type Props = {
  active?: boolean;
};

const DropDownMenuContent = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--dashboard-dropdown-radius);
  border-left: 2px solid var(--dashboard-border-color);
  padding: 5px 10px;
  background-color: ${({ active }) =>
    active ? 'var(--dashboard-color-lightgrey)' : 'var(--dashboard-color-white)'};
`;

const DropDownMenuButton = styled.div`
  background-color: var(--dashboard-color-white);
  padding: 0 20px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: var(--dashboard-dropdown-avatar-size);
  height: var(--dashboard-dropdown-avatar-size);
  border-radius: var(--dashboard-default-radius);
  margin-right: 8px;
`;

export default DropDownMenu;
