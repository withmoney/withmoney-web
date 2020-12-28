import React from 'react';
import styled from 'styled-components';
import Info from './Info';

const Information = () => {
  const percentCalc = (current: number, desired: number) => {
    const result = Math.round((current * 100) / desired);
    return `${result}%`;
  };

  return (
    <InformationContainer>
      <Info
        percent={percentCalc(10, 100)}
        color="#80DA89"
        name="Entrance"
        current={10}
        desired={100}
      />
      <Info
        percent={percentCalc(50, 100)}
        color="#DA9680"
        name="Recurrent"
        current={50}
        desired={100}
      />
      <Info
        percent={percentCalc(75, 100)}
        color="#D3DA80"
        name="Credit"
        current={75}
        desired={100}
      />
      <Info
        percent={percentCalc(100, 100)}
        color="#C380DA"
        name="Unforessen"
        current={100}
        desired={100}
      />
    </InformationContainer>
  );
};

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 315px);
  background-color: #ffff;
  border-bottom: 2px solid #f2f2f2;
`;

export default Information;
