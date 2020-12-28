import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';

const Balance = () => {
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text bold>R$ 1200,00</Text>
      <Text>{currencyFormat(LANG, CURRENCY, 1200)}</Text>
    </BalanceContainer>
  );
};

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 85px;
  background-color: #ffff;
  border-bottom: 2px solid #f2f2f2;
`;

export default Balance;
