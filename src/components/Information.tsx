import React from 'react';
import styled from 'styled-components';
import Info from './Info';

const Information = () => {
  return (
    <InformationContainer>
      <Info percent="80%" color="#80DA89" name="Entrance" current="100" desired="110" />
      <Info percent="80%" color="#DA9680" name="Recurrent" current="100" desired="110" />
      <Info percent="80%" color="#D3DA80" name="Credit" current="100" desired="110" />
      <Info percent="80%" color="#C380DA" name="Unforessen" current="100" desired="110" />
    </InformationContainer>
  );
};

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 365px);
  background-color: #ffff;
  border-bottom: solid 2px #f2f2f2;
`;

export default Information;
