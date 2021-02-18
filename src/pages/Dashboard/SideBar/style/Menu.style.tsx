import styled from 'styled-components';
import Link from '../../../../components/Link';
import { AttachMoney as IconMoney } from '@styled-icons/material';
import { BarGraph } from '@styled-icons/entypo';
import { UserAccount } from '@styled-icons/boxicons-solid';
import { Category } from '@styled-icons/boxicons-solid';
import { CreditCardFill } from '@styled-icons/bootstrap';

export const Money = styled(IconMoney)`
  width: 30px;
  margin-right: 10px;
  color: var(--icon-default-color);
`;

export const Accounts = styled(UserAccount)`
  width: 30px;
  margin-right: 10px;
  color: var(--icon-default-color);
`;

export const Categories = styled(Category)`
  width: 30px;
  margin-right: 10px;
  color: var(--icon-default-color);
`;

export const CreditCard = styled(CreditCardFill)`
  width: 30px;
  margin-right: 10px;
  color: var(--icon-default-color);
`;

export const Graph = styled(BarGraph)`
  width: 30px;
  margin-right: 10px;
  color: var(--icon-default-color);
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--dashboard-color-white);
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--dashboard-border-color);
`;

export const MenuSettings = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--dashboard-color-white);
  padding-bottom: 20px;
`;

type ButtonProps = {
  open?: boolean;
};

export const MenuButton = styled(Link)<ButtonProps>`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: ${({ open }) =>
    open ? 'var(--dashboard-button-color-hover)' : 'var(--dashboard-color-white)'};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 20px;
`;
