import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { AttachMoney as IconMoney, MoneyOff as IconMoneyOff } from '@styled-icons/material';

const Menu = () => {
  return (
    <MenuContainer>
      <MenuButton>
        <Money />
        <Text>Transition</Text>
      </MenuButton>
      <MenuButton>
        <MoneyOff />
        <Text>Reports</Text>
      </MenuButton>
    </MenuContainer>
  );
};

const Money = styled(IconMoney)`
  width: 30px;
  margin-right: 10px;
`;

const MoneyOff = styled(IconMoneyOff)`
  width: 30px;
  margin-right: 10px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  background-color: #ffff;
  padding-top: 20px;
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffff;
  width: 300px;
  height: 45px;
  padding: 0 20px;
  outline: none;
  border: none;

  &:hover {
    background-color: #e7e7e7;
  }

  &:active {
    background-color: #dadada;
  }
`;

export default Menu;
