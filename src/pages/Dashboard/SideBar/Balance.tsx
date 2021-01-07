import React, { useState, useEffect } from 'react';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { useOperations } from '../../../hooks/useOperations';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const { data } = useOperations();

  useEffect(() => {
    const getOperations = () => {
      const operations = data.me.operations;
      const getBalance = operations.reduce((initValue: number, currentValue: any) => {
        if (currentValue.type === 'Deposit') {
          return initValue + currentValue.value;
        } else {
          return initValue - currentValue.value;
        }
      }, 0);
      return getBalance;
    };

    if (data) {
      setBalance(getOperations());
    }
  }, [data]);

  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text bold>{currencyFormat(LANG, CURRENCY, balance)}</Text>
    </BalanceContainer>
  );
};

export default Balance;
