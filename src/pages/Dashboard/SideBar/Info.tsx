import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';

type Props = {
  name: string;
  current: string | any;
  desired: string | any;
  color: string;
  percent: string;
};

const Info = ({ name, current, desired, color, percent }: Props) => {
  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress color={color} percent={percent} />
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
  width: 100%;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #cfcfcf;
`;

type ProgressProps = {
  color: string;
  percent?: string;
};

const Progress = styled.div<ProgressProps>`
  width: ${({ percent = '0%' }) => `${percent}`};
  height: 10px;
  background-color: ${({ color = '#fff' }) => color};
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Info;
