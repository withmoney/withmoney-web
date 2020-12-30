import React from 'react';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './styles/Balance styles';

const Balance = () => {
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text>{currencyFormat(LANG, CURRENCY, 1200)}</Text>
    </BalanceContainer>
  );
};

export default Balance;
