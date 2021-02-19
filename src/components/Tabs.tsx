import React from 'react';
import styled from 'styled-components';
import { ArrowCircleDown } from '@styled-icons/fa-solid';
import { Sync } from '@styled-icons/evaicons-solid';
import { ShoppingCart, CreditCard } from '@styled-icons/entypo';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { TransactionType } from 'models';

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
        operationType={currentTransactionType}
      >
        <ArrowCircleDown />
        Incomes
      </Button>
      <Button
        type="button"
        onClick={() => {
          setCurrentTransactionType(TransactionType.FixedExpense);
        }}
        open={currentTransactionType === TransactionType.FixedExpense}
        operationType={currentTransactionType}
      >
        <Sync />
        Recurrent Expenses
      </Button>
      <Button
        onClick={() => setCurrentTransactionType(TransactionType.VariableExpense)}
        open={currentTransactionType === TransactionType.VariableExpense}
        operationType={currentTransactionType}
      >
        <ShoppingCart />
        Other Expenses
      </Button>
      <Button
        type="button"
        onClick={() => setCurrentTransactionType(TransactionType.CreditCard)}
        open={currentTransactionType === TransactionType.CreditCard}
        operationType={currentTransactionType}
      >
        <CreditCard />
        Credit Card Expenses
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
  open: boolean;
  operationType: string | undefined;
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ open }) => (open ? 'var(--dashboard-color-white)' : 'normal')};
  padding: 20px;
  text-decoration: none;
  background-color: ${({ open, operationType }) =>
    open ? `var(--dashboard-progress-bar-${operationType})` : `var(--dashboard-color-grey)`};
  outline: none;
  border: none;
  cursor: pointer;

  svg {
    color: ${({ open }) => (open ? 'var(--dashboard-color-white)' : 'rgba(0, 0, 0, 0.5);')};
    width: 20px;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${({ open, operationType }) =>
      open
        ? `var(--dashboard-progress-bar-${operationType})`
        : 'var(--dashboard-button-color-hover)'};
  }

  &:active {
    background-color: ${({ open, operationType }) =>
      open
        ? `var(--dashboard-progress-bar-${operationType})`
        : 'var(--dashboard-button-color-active)'};
  }
`;
