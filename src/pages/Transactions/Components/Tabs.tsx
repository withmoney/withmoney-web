import React from 'react';
import styled from 'styled-components';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { TransactionType } from '../../../models';

export const Tabs = () => {
  const { currentTransactionType, setCurrentTransactionType } = useOperationsFilters();
  return (
    <ButtonGroup>
      <Button
        type="button"
        onClick={() => {
          setCurrentTransactionType(TransactionType.Deposit);
        }}
        open={currentTransactionType === TransactionType.Deposit}
      >
        Entrance
      </Button>
      <Button
        type="button"
        onClick={() => {
          setCurrentTransactionType(TransactionType.FixedExpense);
        }}
        open={currentTransactionType === TransactionType.FixedExpense}
      >
        Recurrent
      </Button>
      <Button
        onClick={() => setCurrentTransactionType(TransactionType.CreditCard)}
        open={currentTransactionType === TransactionType.CreditCard}
      >
        Credit
      </Button>
      <Button
        type="button"
        onClick={() => setCurrentTransactionType(TransactionType.VariableExpense)}
        open={currentTransactionType === TransactionType.VariableExpense}
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

export const Button = styled.button<ButtonProps>`
  padding: 20px;
  text-decoration: none;
  background-color: ${({ open }) =>
    open ? `var(--dashboard-color-white)` : `var(--dashboard-color-grey)`};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ open }) =>
      open ? 'var(--dashboard-color-white)' : 'var(--dashboard-button-color-hover)'};
  }

  &:active {
    background-color: ${({ open }) =>
      open ? 'var(--dashboard-color-white)' : 'var(--dashboard-button-color-active)'};
  }
`;
