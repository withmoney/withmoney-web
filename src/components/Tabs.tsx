import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ArrowCircleDown } from '@styled-icons/fa-solid';
import { Sync } from '@styled-icons/evaicons-solid';
import { ShoppingCart, CreditCard } from '@styled-icons/entypo';
import { Filter } from '@styled-icons/fa-solid/Filter';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import ButtonIcon from 'components/ButtonIcon';
import { TransactionType } from 'models';

type Props = {
  filterVisibility: boolean;
  onToggleFilterVisibility: () => void;
};

export const Tabs = ({ filterVisibility, onToggleFilterVisibility }: Props) => {
  const { currentTransactionType, setCurrentTransactionType } = useOperationsFilters();
  const { t } = useTranslation('operations');
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
        {t('incomes')}
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
        {t('recurrentExpenses')}
      </Button>
      <Button
        onClick={() => setCurrentTransactionType(TransactionType.VariableExpense)}
        open={currentTransactionType === TransactionType.VariableExpense}
        operationType={currentTransactionType}
      >
        <ShoppingCart />

        {t('otherExpenses')}
      </Button>
      <Button
        type="button"
        onClick={() => setCurrentTransactionType(TransactionType.CreditCard)}
        open={currentTransactionType === TransactionType.CreditCard}
        operationType={currentTransactionType}
      >
        <CreditCard />
        {t('creditCardExpenses')}
      </Button>
      <RightSection>
        <ButtonIcon type="button" variation="light" onClick={onToggleFilterVisibility}>
          <Filter size={16} /> <span>{filterVisibility ? t('hide') : t('show')}</span>
        </ButtonIcon>
      </RightSection>
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

const RightSection = styled.div`
  flex: 1;
  margin-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
