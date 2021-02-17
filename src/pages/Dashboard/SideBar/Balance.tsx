import React from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';
import { useOperations } from '../../../hooks/useOperations';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { useUserLanguage } from '../../../hooks/useUser';
import getBalance from '../../../utils/getBalance';

const Balance = () => {
  const { currentAccount } = useAccountFilters();
  const { value: language } = useUserLanguage();
  const { data } = useOperations();
  const operations = data?.operations || [];
  const balanceOperations = getBalance(operations);
  const PreviousBalance = data?.balance.amount || 0;
  const balance = balanceOperations + PreviousBalance;

  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text variation={balance < 0 ? 'danger' : 'default'} bold>
        {language && currentAccount && currencyFormat(language, currentAccount.currency, balance)}
      </Text>
    </BalanceContainer>
  );
};

export default Balance;
