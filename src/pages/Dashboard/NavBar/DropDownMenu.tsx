import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Text from '../../../components/Text';
import { useHide } from '../../../hooks/useHide';

const data = { fistName: 'User', lastName: 'Name', image: '' };

const DropDownMenu = () => {
  const { showMenu, setShowMenu } = useHide();

  const getDefaultImage = () => {
    const URL = `https://ui-avatars.com/api/?name=${data.fistName}+${data.lastName}`;
    return URL;
  };

  return (
    <DropDownMenuContent>
      <DropDownMenuButton onClick={() => setShowMenu(!showMenu)}>
        <Avatar src={getDefaultImage()} />
        <Text>
          {data.fistName} {data.lastName}
        </Text>
      </DropDownMenuButton>
      <Menu />
    </DropDownMenuContent>
  );
};

const DropDownMenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--dashboard-dropdown-radius);
  padding: 5px 10px;
  outline: none;
  border: none;
  background-color: var(--dashboard-color-white);
  border-left: 2px solid var(--dashboard-border-color);

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;

const DropDownMenuContent = styled.div`
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
