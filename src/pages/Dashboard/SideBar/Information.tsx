import React from 'react';
import Info from './Info';
import { InformationContainer } from './style/Information.style';

const Information = () => {
  const percentCalc = (current: number, desired: number) => {
    const result = Math.round((current * 100) / desired);
    return `${result}%`;
  };

  return (
    <InformationContainer>
      <Info
        percent={percentCalc(10, 100)}
        variation="entrance"
        name="Entrance"
        current={10}
        desired={100}
      />
      <Info
        percent={percentCalc(50, 100)}
        variation="recurrent"
        name="Recurrent"
        current={50}
        desired={100}
      />
      <Info
        percent={percentCalc(75, 100)}
        variation="credit"
        name="Credit"
        current={75}
        desired={100}
      />
      <Info
        percent={percentCalc(100, 100)}
        variation="unforessen"
        name="Unforessen"
        current={100}
        desired={100}
      />
    </InformationContainer>
  );
};

export default Information;
