import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { currencyFormat } from '../../../utils/currency';
import { LANG, CURRENCY } from '../../../constants/currency';

const data = {
  entrance: 12000.0,
  recurrent: 800.0,
  credit: 200.0,
  unforeseen: 150.0,
  closeBalance: 50.0,
};

const FooterContainer = () => {
  return (
    <InfoContainer>
      <InfoWrapper>
        <Info style={{ borderBottom: '2px solid #dddd' }}>
          <InfoTitle>
            <Text>Entrance</Text>
            <Text>Recurrent</Text>
            <Text>Credit</Text>
            <Text>Unforeseen</Text>
          </InfoTitle>
          <InfoValue>
            <Text>{data.entrance}</Text>
            <Text>{data.recurrent}</Text>
            <Text>{data.credit}</Text>
            <Text>{data.unforeseen}</Text>
          </InfoValue>
        </Info>
        <Info>
          <InfoTitle>
            <Text bold>Closing balance</Text>
          </InfoTitle>
          <InfoValue>
            <Text bold>{currencyFormat(LANG, CURRENCY, data.closeBalance)}</Text>
          </InfoValue>
        </Info>
      </InfoWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #fafafa;
  padding: 30px;
`;

const InfoWrapper = styled.div`
  display: 'flex';
  flex-direction: 'column';
  padding-right: 25%;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InfoTitle = styled.div`
  width: '200px';
  text-align: right;
  width: 250px;
  ${Text} {
    padding: 10px 0;
    margin-right: 25px;
  }
`;

const InfoValue = styled.div`
  width: 150px;
  ${Text} {
    padding: 10px 0;
  }
`;

export default FooterContainer;
