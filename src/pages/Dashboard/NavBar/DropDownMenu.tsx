import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Text from '../../../components/Text';

const URL =
  'https://www.accessinsurance.co.uk/wp-content/themes/accessinsurance2017/images/ourpeople/benstarling.jpg';

const DropDownMenu = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  const OpenMenu = () => {
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  return (
    <DropDownMenuContainer onClick={OpenMenu}>
      <DropDownMenuContent active={activeMenu}>
        <Avatar src={URL} />
        <Text>User Name</Text>
      </DropDownMenuContent>
      <Menu show={activeMenu} />
    </DropDownMenuContainer>
  );
};

type Props = {
  active?: boolean;
};

const DropDownMenuContent = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  background-color: ${({ active }) => (active ? '#dadada' : '#fffff')};
`;

const DropDownMenuContainer = styled.div`
  padding: 0 20px;
  border-left: solid 2px #e7e7e7;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 7px;
`;

export default DropDownMenu;
