import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import { currencyFormat } from 'utils/currency';
import { useOperations } from 'hooks/useOperations';
import { getTotalPendingExpenses } from 'utils/calcOperations';
import { PlannedBalance, getTotalOperations } from 'utils/calcOperations';
import { getTotalPaidExpenses, getTotalCreditCardExpenses } from 'utils/calcOperations';
import { InfoContainer, InfoWrapper, Info } from './style/FooterContainer.style';
import { IncomesIcons, PaidExpenses, PendingExpensesIcons } from './style/FooterContainer.style';
import { CreditCardExpenses } from './style/FooterContainer.style';
import { InfoTitle, InfoValue } from './style/FooterContainer.style';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { useUserLanguage } from 'hooks/useUser';

const FooterContainer = () => {
  const { t } = useTranslation('operations');
  const { data } = useOperations();
  const operations = data?.operations || [];
  const previousBalance = data?.balance.amount || 0;
  const { value: language } = useUserLanguage();
  const AllIncomes = getTotalOperations(operations);
  const totalPaidExpenses = getTotalPaidExpenses(operations);
  const totalPendingExpenses = getTotalPendingExpenses(operations);
  const totalCreditCardExpenses = getTotalCreditCardExpenses(operations);
  const totalPlannedBalance = PlannedBalance(operations) + previousBalance;
  const { currentAccount } = useAccountFilters();

  return (
    <InfoContainer>
      <InfoWrapper>
        <Info style={{ borderBottom: '2px solid #dddd' }}>
          <InfoTitle>
            <Text>
              {t('pendingExpenses')}
              <PendingExpensesIcons />
            </Text>
            <Text>
              {t('paidExpenses')} <PaidExpenses />
            </Text>
          </InfoTitle>
          <InfoValue>
            {currentAccount && language && (
              <>
                <Text>
                  {currencyFormat(language, currentAccount.currency, totalPendingExpenses)}
                </Text>
                <Text>{currencyFormat(language, currentAccount.currency, totalPaidExpenses)}</Text>
              </>
            )}
          </InfoValue>
        </Info>
        <Info style={{ borderBottom: '2px solid #dddd' }}>
          <InfoTitle>
            <Text>
              {t('allIncomes')} <IncomesIcons />
            </Text>
            <Text>
              {t('allExpenses')}
              <PendingExpensesIcons />
            </Text>
            <Text>
              {t('allCreditCardExpenses')}
              <CreditCardExpenses />
            </Text>
          </InfoTitle>
          {currentAccount && language && (
            <InfoValue>
              <Text>{currencyFormat(language, currentAccount.currency, AllIncomes)}</Text>
              <Text>
                {currencyFormat(
                  language,
                  currentAccount.currency,
                  totalPaidExpenses + totalPendingExpenses,
                )}
              </Text>
              <Text>
                {currencyFormat(language, currentAccount.currency, totalCreditCardExpenses)}
              </Text>
            </InfoValue>
          )}
        </Info>
        <Info>
          <InfoTitle>
            <Text style={{ marginRight: '55px' }} bold>
              {t('plannedMonthBalance')}
            </Text>
          </InfoTitle>
          <InfoValue>
            {currentAccount && language && (
              <Text variation={totalPlannedBalance < 0 ? 'danger' : 'default'} bold>
                {currencyFormat(language, currentAccount.currency, totalPlannedBalance)}
              </Text>
            )}
          </InfoValue>
        </Info>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default FooterContainer;
