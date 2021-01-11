import React from 'react';
import styled from 'styled-components';
import Link from '../../../components/Link';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { TransactionType } from '../../../models';

export const Tabs = () => {
  const { currentTransactionType, setCurrentTransactionType } = useOperationsFilters();
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          setCurrentTransactionType(TransactionType.Deposit);
        }}
        open={currentTransactionType === TransactionType.Deposit}
        to="/dashboard"
      >
        Entrance
      </Button>
      <Button
        onClick={() => {
          setCurrentTransactionType(TransactionType.FixedExpense);
        }}
        open={currentTransactionType === TransactionType.FixedExpense}
        to="/dashboard"
      >
        Recurrent
      </Button>
      <Button
        onClick={() => setCurrentTransactionType(TransactionType.CreditCard)}
        open={currentTransactionType === TransactionType.CreditCard}
        to="/dashboard"
      >
        Credit
      </Button>
      <Button
        onClick={() => setCurrentTransactionType(TransactionType.VariableExpense)}
        open={currentTransactionType === TransactionType.VariableExpense}
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
