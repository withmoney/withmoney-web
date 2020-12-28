import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';

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

const InfoContainer = styled.div`
  padding: 10px 20px;
`;

const ProgressBar = styled.div`
  display: flex;
  background-color: var(--dashboard-empty-progress-bar);
`;

type ProgressProps = {
  variation: string;
  percent: string;
};

const Progress = styled.div<ProgressProps>`
  width: ${({ percent }) => percent};
  padding: 5px 0;
  background-color: ${({ variation }) => `var(--dashboard-progress-bar-${variation})`};
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Info;
