import React, { useState, useEffect } from 'react';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';
import { BalanceContainer } from './style/Balance.style';

type Props = {
  balance: number;
};

const Balance = ({ balance }: Props) => {
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text bold>{currencyFormat(LANG, CURRENCY, balance)}</Text>
    </BalanceContainer>
  );
};

export default Balance;
