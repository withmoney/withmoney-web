import styled from 'styled-components';
import { Menu as MenuIcon } from '@styled-icons/material';

type PropsMenu = {
  active: boolean;
};

export const Menu = styled(MenuIcon)<PropsMenu>`
  margin: 0 15px;
  padding: 5px;
  width: var(--dashboard-icon-size);
  color: var(--dashboard-icon-color);
  background-color: ${({ active }) =>
    active ? 'var(--dashboard-color-lightgrey)' : 'var(--dashboard-color-white)'};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--dashboard-color-lightgrey);
  }

  &:active {
    background-color: var(--dashboard-color-grey);
    box-shadow: 0px 0px 0px 2px rgba(50, 115, 220, 0.25);
  }
`;

export const MeuButton = styled.button`
  background-color: var(--dashboard-color-white);
  padding: 0;
  outline: none;
  border: none;
`;

type ContainerProps = {
  show: boolean;
};

export const MenuContainer = styled.div<ContainerProps>`
  min-width: ${({ show }) => (show ? '0' : '300px')};
  display: flex;
  align-items: center;
  background-color: var(--dashboard-color-white);
  border-right: 2px solid var(--dashboard-border-color);
`;
