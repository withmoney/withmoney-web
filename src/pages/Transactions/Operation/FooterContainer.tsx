import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';
import { useOperations } from '../../../hooks/useOperations';
import { TransactionType } from '../../../models';
import { getTotalOperations } from '../../../utils/calcOperations';

const FooterContainer = () => {
  const { data } = useOperations();
  const operations = data?.me?.operations || [];

  const totalEntrance = getTotalOperations(operations, TransactionType.Deposit);
  const totalRecurrent = getTotalOperations(operations, TransactionType.CreditCard);
  const totalCredit = getTotalOperations(operations, TransactionType.FixedExpense);
  const totalUnforeseen = getTotalOperations(operations, TransactionType.VariableExpense);
  const closeBalance = totalEntrance - totalRecurrent - totalCredit - totalUnforeseen;

  return (
    <InfoContainer>
      <InfoWrapper>
        <Info style={{ borderBottom: '2px solid #dddd' }}>
          <InfoTitle>
            <Text>Entrance</Text>
            <Text>Recurrent</Text>
            <Text>Credit</Text>
            <Text>Unforeseen</Text>
          </InfoTitle>
          <InfoValue>
            <Text>{currencyFormat(LANG, CURRENCY, totalEntrance)}</Text>
            <Text>{currencyFormat(LANG, CURRENCY, totalRecurrent)}</Text>
            <Text>{currencyFormat(LANG, CURRENCY, totalCredit)}</Text>
            <Text>{currencyFormat(LANG, CURRENCY, totalUnforeseen)}</Text>
          </InfoValue>
        </Info>
        <Info>
          <InfoTitle>
            <Text bold>Closing balance</Text>
          </InfoTitle>
          <InfoValue>
            <Text variation={closeBalance < 0 ? 'danger' : 'default'} bold>
              {currencyFormat(LANG, CURRENCY, closeBalance)}
            </Text>
          </InfoValue>
        </Info>
      </InfoWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  padding: 30px;
`;

const InfoWrapper = styled.div`
  display: 'flex';
  flex-direction: 'column';
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoTitle = styled.div`
  width: '200px';
  text-align: right;
  width: 250px;
  ${Text} {
    padding: 10px 0;
    margin-right: 25px;
  }
`;

const InfoValue = styled.div`
  width: 150px;
  ${Text} {
    padding: 10px 0;
  }
`;

export default FooterContainer;
