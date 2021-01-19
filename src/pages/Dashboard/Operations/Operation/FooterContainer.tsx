import React from 'react';
import Text from '../../../../components/Text';
import { currencyFormat } from '../../../../utils/currency';
import { LANG, CURRENCY } from '../../../../constants/currency';
import { useOperations } from '../../../../hooks/useOperations';
import { TransactionType } from '../../../../models';
import { getTotalOperations } from '../../../../utils/calcOperations';
import {
  InfoContainer,
  InfoWrapper,
  Info,
  InfoTitle,
  InfoValue,
} from './style/FooterContainer.style';

const FooterContainer = () => {
  const { data } = useOperations();
  const operations = data?.me?.operations || [];

  const totalEntrance = getTotalOperations(operations, TransactionType.Deposit);
  const totalRecurrent = getTotalOperations(operations, TransactionType.FixedExpense);
  const totalCredit = getTotalOperations(operations, TransactionType.CreditCard);
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

export default FooterContainer;
