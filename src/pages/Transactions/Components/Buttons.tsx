import React from 'react';
import styled from 'styled-components';
import Link from '../../../components/Link';

interface Props {
  activeButton: string;
}

export const Buttons = ({ activeButton }: Props) => {
  return (
    <ButtonGroup>
      <Button open={activeButton === 'Entrance'} to="/dashboard">
        Entrance
      </Button>
      <Button open={activeButton === 'Recurrent'} to="/recurrent">
        Recurrent
      </Button>
      <Button open={activeButton === 'Credit'} to="/credit">
        Credit
      </Button>
      <Button open={activeButton === 'Unforeseen'} to="/unforeseen">
        Unforeseen
      </Button>
    </ButtonGroup>
  );
};

export const ButtonGroup = styled.div`
  display: flex;
  margin: 0 6px;
  background-color: var(--dashboard-color-grey);
`;

type ButtonProps = {
  open?: boolean;
};

export const Button = styled(Link)<ButtonProps>`
  padding: 20px;
  text-decoration: none;
  background-color: ${({ open }) =>
    open ? `var(--dashboard-color-white)` : `var(--dashboard-color-grey)`};
  outline: none;
  border: none;

  &:hover {
    background-color: var(--dashboard-button-color-hover);
  }

  &:active {
    background-color: var(--dashboard-button-color-active);
  }
`;
