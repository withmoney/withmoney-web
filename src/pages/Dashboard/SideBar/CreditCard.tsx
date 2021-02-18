import React, { useState, useEffect } from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { InfoContainer, ProgressBar, Progress, BalanceContainer } from './style/Info.style';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import { useUserLanguage } from '../../../hooks/useUser';

type Props = {
  name: string;
  limit: number;
  currentLimit: number;
};

const percentCalc = (currentLimit: number, limit: number) => {
  const result = Math.round((currentLimit * 100) / limit);
  return { percent: `${result}%`, value: result };
};

const Info = ({ name, limit, currentLimit }: Props) => {
  const { percent, value } = percentCalc(currentLimit, limit);
  const [variation, setVariation] = useState<string>();
  const { currentAccount } = useAccountFilters();
  const { value: language } = useUserLanguage();

  useEffect(() => {
    if (value <= 30) {
      setVariation('green');
    } else if (value <= 60) {
      setVariation('orange');
    } else if (value <= 100) {
      setVariation('pink');
    } else {
      setVariation('red');
    }
  }, [value]);

  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress variation={variation} percent={percent} />
      </ProgressBar>
      <BalanceContainer>
        {language && currentAccount && (
          <>
            <Text>{currencyFormat(language, currentAccount.currency, limit - currentLimit)}</Text>
            <Text>{currencyFormat(language, currentAccount.currency, limit)}</Text>
          </>
        )}
      </BalanceContainer>
      <BalanceContainer>
        <Text font="sm">Total Limit</Text>
        <Text font="sm">Limit Available</Text>
      </BalanceContainer>
    </InfoContainer>
  );
};

export default Info;
