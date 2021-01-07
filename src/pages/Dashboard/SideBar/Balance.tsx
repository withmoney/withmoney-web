import React from 'react';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { useOperations } from '../../../hooks/useOperations';
import { TransactionType, Operation } from '../../../models';

function getBalance(operations: Operation[]): number {
  return operations.reduce((initValue: number, currentValue) => {
    if (!currentValue.isPaid) return initValue;

    if (currentValue.type === TransactionType.Deposit) {
      return initValue + currentValue.value;
    } else {
      return initValue - currentValue.value;
    }
  }, 0);
}

const Balance = () => {
  const { data } = useOperations();
  const operations = data?.me?.operations || [];
  const balance = getBalance(operations);

  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text bold>{currencyFormat(LANG, CURRENCY, balance)}</Text>
    </BalanceContainer>
  );
};

export default Balance;
