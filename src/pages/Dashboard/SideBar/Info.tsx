import React from 'react';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';
import { InfoContainer, ProgressBar, Progress, BalanceContainer } from './styles/Info.styles';

type Props = {
  name: string;
  current: string | any;
  desired: string | any;
  variation: 'entrance' | 'recurrent' | 'credit' | 'unforessen';
  percent: string;
};

const Info = ({ name, current, desired, variation, percent }: Props) => {
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
