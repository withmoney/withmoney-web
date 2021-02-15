import React from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG } from '../../../constants/Langs';
import { InfoContainer, ProgressBar, Progress, BalanceContainer } from './style/Info.style';
import { useAccountFilters } from '../../../hooks/useAccountFilters';

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
  const percent = percentCalc(current, desired);
  const { currentAccount } = useAccountFilters();
  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress variation={variation} percent={percent} />
      </ProgressBar>
      <BalanceContainer>
        {currentAccount && (
          <>
            <Text>{currencyFormat(LANG, currentAccount.currency, current)}</Text>
            <Text>{currencyFormat(LANG, currentAccount.currency, desired)}</Text>
          </>
        )}
      </BalanceContainer>
    </InfoContainer>
  );
};

export default Info;
