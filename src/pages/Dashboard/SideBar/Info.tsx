import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';

type Props = {
  name?: string;
  current?: string;
  desired?: string;
  color?: string;
  percent?: string;
};

const Info = ({ name, current, desired, color, percent }: Props) => {
  return (
    <InfoContainer>
      <Text>{name}</Text>
      <ProgressBar>
        <Progress color={color} percent={percent} />
      </ProgressBar>
      <BalanceContainer>
        <Text>R$ {current}</Text>
        <Text>R$ {desired}</Text>
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

const Progress = styled.div<Props>`
  width: ${({ percent = '0%' }) => `${percent}`};
  height: 10px;
  background-color: ${({ color }) => color};
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Info;
