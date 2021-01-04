import styled from 'styled-components';
import { AttachMoney as IconMoney, MoneyOff as IconMoneyOff } from '@styled-icons/material';

export const Money = styled(IconMoney)`
  width: 30px;
  margin-right: 10px;
`;

export const MoneyOff = styled(IconMoneyOff)`
  width: 30px;
  margin-right: 10px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--dashboard-color-white);
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const MenuButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--dashboard-color-white);
  padding: 10px 20px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;
