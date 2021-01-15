import styled from 'styled-components';
import Text from '../../../../components/Text';

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  padding: 30px;
`;

export const InfoWrapper = styled.div`
  display: 'flex';
  flex-direction: 'column';
`;

export const Info = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoTitle = styled.div`
  width: '200px';
  text-align: right;
  width: 250px;
  ${Text} {
    padding: 10px 0;
    margin-right: 25px;
  }
`;

export const InfoValue = styled.div`
  width: 150px;
  ${Text} {
    padding: 10px 0;
  }
`;
