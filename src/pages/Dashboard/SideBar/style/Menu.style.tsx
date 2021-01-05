import styled from 'styled-components';
import Link from '../../../../components/Link';
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

type MenuButtonProps = {
  isActive?: boolean;
};

export const MenuButton = styled(Link)<MenuButtonProps>`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--dashboard-button-color-hover)' : `var(--dashboard-color-white)`};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;
