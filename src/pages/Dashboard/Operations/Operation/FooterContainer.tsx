import React from 'react';
import Text from '../../../../components/Text';
import { currencyFormat } from '../../../../utils/currency';
import { LANG } from '../../../../constants/Langs';
import { useOperations } from '../../../../hooks/useOperations';
import { getTotalPendingExpenses } from '../../../../utils/calcOperations';
import { PlannedBalance, getTotalOperations } from '../../../../utils/calcOperations';
import { getTotalPaidExpenses, getTotalCreditCardExpenses } from '../../../../utils/calcOperations';
import { InfoContainer, InfoWrapper, Info } from './style/FooterContainer.style';
import { IncomesIcons, PaidExpenses, PendingExpensesIcons } from './style/FooterContainer.style';
import { CreditCardExpenses } from './style/FooterContainer.style';
import { InfoTitle, InfoValue } from './style/FooterContainer.style';
import { useAccountFilters } from '../../../../hooks/useAccountFilters';

const FooterContainer = () => {
  const { data } = useOperations();
  const operations = data?.operations || [];

  const AllIncomes = getTotalOperations(operations);
  const totalPaidExpenses = getTotalPaidExpenses(operations);
  const totalPendingExpenses = getTotalPendingExpenses(operations);
  const totalCreditCardExpenses = getTotalCreditCardExpenses(operations);
  const totalPlannedBalance = PlannedBalance(operations);
  const { currentAccount } = useAccountFilters();

  return (
    <InfoContainer>
      <InfoWrapper>
        <Info style={{ borderBottom: '2px solid #dddd' }}>
          <InfoTitle>
            <Text>
              All Incomes <IncomesIcons />
            </Text>
            <Text>
              Pending Expenses <PendingExpensesIcons />
            </Text>
            <Text>
              Paid Expenses <PaidExpenses />
            </Text>
            <Text>
              All Credit Card Expenses <CreditCardExpenses />
            </Text>
          </InfoTitle>
          <InfoValue>
            {currentAccount && (
              <>
                <Text>{currencyFormat(LANG, currentAccount.currency, AllIncomes)}</Text>
                <Text>{currencyFormat(LANG, currentAccount.currency, totalPendingExpenses)}</Text>
                <Text>{currencyFormat(LANG, currentAccount.currency, totalPaidExpenses)}</Text>
                <Text>
                  {currencyFormat(LANG, currentAccount.currency, totalCreditCardExpenses)}
                </Text>
              </>
            )}
          </InfoValue>
        </Info>
        <Info>
          <InfoTitle>
            <Text style={{ marginRight: '60px' }} bold>
              Planned Balance
            </Text>
          </InfoTitle>
          <InfoValue>
            {currentAccount && (
              <Text variation={totalPlannedBalance < 0 ? 'danger' : 'default'} bold>
                {currencyFormat(LANG, currentAccount.currency, totalPlannedBalance)}
              </Text>
            )}
          </InfoValue>
        </Info>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default FooterContainer;
