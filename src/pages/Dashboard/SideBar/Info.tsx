import React from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';
import { InfoContainer, ProgressBar, Progress, BalanceContainer } from './style/Info.style';

type Props = {
  name: string;
  current: number;
  desired: number;
  variation: 'entrance' | 'recurrent' | 'credit' | 'Unforeseen';
};

const percentCalc = (current: number, desired: number) => {
  const result = Math.round((current * 100) / desired);
  return `${result}%`;
};

const Info = ({ name, current, desired, variation }: Props) => {
  const percent = percentCalc(current, desired);
  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress variation={variation} percent={percent} />
      </ProgressBar>
      <BalanceContainer>
        <Text>{currencyFormat(LANG, CURRENCY, current)}</Text>
        <Text>{currencyFormat(LANG, CURRENCY, desired)}</Text>
      </BalanceContainer>
    </InfoContainer>
  );
};

export default Info;
