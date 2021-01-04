import React from 'react';
import styled from 'styled-components';
import Text from '../../../components/Text';

const data = {
  entrance: 'R$ 12.00,00',
  recurrent: 'R$ 800,00',
  credit: 'R$ 200,00',
  unforeseen: 'R$ 150,00',
  closeBalance: 'R$ 50,00',
};

const EntranceInfo = () => {
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
            <Text bold>{data.closeBalance}</Text>
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

export default EntranceInfo;
