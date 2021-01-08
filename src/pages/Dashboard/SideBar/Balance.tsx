import React from 'react';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { useOperations } from '../../../hooks/useOperations';
import getBalance from '../../../utils/getBalance';

const Balance = () => {
  const { data } = useOperations();
  console.log({ data });
  const operations = data?.me?.operations || [];
  const balance = getBalance(operations);
  console.log(balance);
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text variation={balance < 0 ? 'danger' : 'default'} bold>
        {currencyFormat(LANG, CURRENCY, balance)}
      </Text>
    </BalanceContainer>
  );
};

export default Balance;
