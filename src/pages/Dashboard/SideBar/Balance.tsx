import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { LANG, CURRENCY } from '../../../constants/currency';
import { currencyFormat } from '../../../utils/currency';

const Balance = () => {
  return (
    <BalanceContainer>
      <Text>Balance</Text>
      <Text>{currencyFormat(LANG, CURRENCY, 1200)}</Text>
    </BalanceContainer>
  );
};

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background-color: var(--dashboard-color-white);
  border-bottom: 2px solid var(--dashboard-border-color);
`;

export default Balance;
