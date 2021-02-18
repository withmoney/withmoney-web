import styled from 'styled-components';

type MenuButtonProps = {
  isActive?: boolean;
};

export const DropDownMenuButton = styled.button<MenuButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--dashboard-dropdown-radius);
  padding: 5px 10px;
  margin: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--dashboard-color-lightgrey)' : 'var(--dashboard-color-white)'};

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;

export const DropDownMenuContent = styled.div`
  border-left: 2px solid var(--dashboard-border-color);
  background-color: var(--dashboard-color-white);
  padding: 0 20px;
  cursor: pointer;
`;

type MenuContainerProps = {
  ref: any;
};

export const MenuContainer = styled.div<MenuContainerProps>``;
