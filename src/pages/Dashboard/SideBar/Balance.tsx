import React from 'react';
import Text from '../../../components/Text';
import { LANG } from '../../../constants/Langs';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { useOperations } from '../../../hooks/useOperations';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import getBalance from '../../../utils/getBalance';

const Balance = () => {
  const { data } = useOperations();
  const operations = data?.operations || [];
  const balance = getBalance(operations);
  const { currentAccount } = useAccountFilters();
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text variation={balance < 0 ? 'danger' : 'default'} bold>
        {currentAccount && currencyFormat(LANG, currentAccount.currency, balance)}
      </Text>
    </BalanceContainer>
  );
};

export default Balance;
