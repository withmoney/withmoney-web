import React from 'react';
import styled from 'styled-components';
import { TFoot, TR, TD } from '../Components/Table';

const EntranceLoad = () => {
  return (
    <TFoot>
      <TR>
        <TD>
          <CheckBox disabled />
        </TD>
        <TD>
          <Box />
        </TD>
        <TD>
          <Box />
        </TD>
        <TD>
          <Box />
        </TD>
        <TD>
          <Box />
        </TD>
      </TR>
    </TFoot>
  );
};

const Box = styled.div`
  display: flex;
  height: 40px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 23px;
  height: 23px;
  background: linear-gradient(0deg, #f4f4f4, #f4f4f4), linear-gradient(0deg, #f4f4f4, #f4f4f4),
    #f4f4f4;
`;

export default EntranceLoad;
