import React, { useState, useEffect } from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import {
  InfoContainer,
  ProgressBar,
  ProgressCreditCard,
  BalanceContainer,
} from './style/Info.style';
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
    if (value <= 20) {
      setVariation('#53BC5E');
    } else if (value <= 60) {
      setVariation('#F5AD40');
    } else if (value <= 100) {
      setVariation('#E98686');
    } else {
      setVariation('#ff0000');
    }
  }, [value]);

  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <ProgressCreditCard variation={variation} percent={percent} />
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
