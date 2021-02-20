import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import { currencyFormat } from 'utils/currency';
import { InfoContainer, ProgressBar, Progress, BalanceContainer } from './style/Info.style';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { useUserLanguage } from 'hooks/useUser';

type Props = {
  name: string;
  current: number;
  desired: number;
  variation: 'Deposit' | 'FixedExpense' | 'CreditCard' | 'VariableExpense';
};

const percentCalc = (current: number, desired: number) => {
  const result = Math.round((current * 100) / desired);
  return `${result}%`;
};

const Info = ({ name, current, desired, variation }: Props) => {
  const { currentAccount } = useAccountFilters();
  const { value: language } = useUserLanguage();
  const { t } = useTranslation('sidebar');

  const percent = percentCalc(current, desired);

  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress variation={variation} percent={percent} />
      </ProgressBar>
      <BalanceContainer>
        {language && currentAccount && (
          <>
            <Text>{currencyFormat(language, currentAccount.currency, current)}</Text>
            <Text>{currencyFormat(language, currentAccount.currency, desired)}</Text>
          </>
        )}
      </BalanceContainer>
      <BalanceContainer>
        <Text font="sm">{t('paid')}</Text>
        <Text font="sm">{t('total')}</Text>
      </BalanceContainer>
    </InfoContainer>
  );
};

export default Info;
