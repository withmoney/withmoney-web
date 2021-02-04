import styled from 'styled-components';
import Link from '../../../../components/Link';
import { AttachMoney as IconMoney } from '@styled-icons/material';
import { BarGraph } from '@styled-icons/entypo';

export const Money = styled(IconMoney)`
  width: 30px;
  margin-right: 10px;
`;

export const Graph = styled(BarGraph)`
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
