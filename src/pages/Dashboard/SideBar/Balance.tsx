import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';

const Balance = () => {
  return (
    <BalanceContainer>
      <Text fontSize="18px">Balance</Text>
      <Text weight="900">R$ 1200,00</Text>
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
  border-bottom: solid 2px #f2f2f2;
`;

export default Balance;
