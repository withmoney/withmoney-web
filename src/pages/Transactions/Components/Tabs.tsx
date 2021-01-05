import React, { useState } from 'react';
import styled from 'styled-components';
import Link from '../../../components/Link';

export const Tabs = () => {
  const [CurrentTransactionType, setCurrentTransactionType] = useState('Entrance');

  return (
    <ButtonGroup>
      <Button
        onClick={() => setCurrentTransactionType('Entrance')}
        open={CurrentTransactionType === 'Entrance'}
        to="/dashboard"
      >
        Entrance
      </Button>
      <Button
        onClick={() => setCurrentTransactionType('Recurrent')}
        open={CurrentTransactionType === 'Recurrent'}
        to="/dashboard"
      >
        Recurrent
      </Button>
      <Button
        onClick={() => setCurrentTransactionType('Credit')}
        open={CurrentTransactionType === 'Credit'}
        to="/dashboard"
      >
        Credit
      </Button>
      <Button
        onClick={() => setCurrentTransactionType('Unforeseen')}
        open={CurrentTransactionType === 'Unforeseen'}
        to="/dashboard"
      >
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
    background-color: ${({ open }) =>
      open ? 'var(--dashboard-color-white)' : 'var(--dashboard-button-color-hover)'};
  }

  &:active {
    background-color: ${({ open }) =>
      open ? 'var(--dashboard-color-white)' : 'var(--dashboard-button-color-active)'};
  }
`;
