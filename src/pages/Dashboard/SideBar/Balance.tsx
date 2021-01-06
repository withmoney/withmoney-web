import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { GET_OPERATIONS } from '../../../graphql/AuthGql';
import { useDateTime } from '../../../hooks/useMonthNavigation';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const { currentDateTime } = useDateTime();

  const { data } = useQuery(GET_OPERATIONS, {
    variables: {
      initDate: currentDateTime?.startOf('month'),
      endDate: currentDateTime?.endOf('month'),
    },
  });

  useEffect(() => {
    if (!!data) {
      const operations = data.me.operations;
      const getBalance = operations.reduce((initValue: number, currentValue: any) => {
        if (currentValue.type === 'Deposit') {
          return initValue + currentValue.value;
        } else {
          return initValue - currentValue.value;
        }
      }, 0);
      setBalance(getBalance);
    }
  });

  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text bold>{currencyFormat(LANG, CURRENCY, balance)}</Text>
    </BalanceContainer>
  );
};

export default Balance;
