import React from 'react';
import styled from 'styled-components';
import { Buttons } from '../Components/Buttons';
import { Table, TableConfig } from '../Components/Table';
import Container from '../Components/Container';
import EntranceButton from './EntranceButton';
import EntranceTitle from './EntranceTitle';
import EntranceData from './EntranceData';
import EntranceLoad from './EntranceLoad';
import EntranceInfo from './EntranceInfo';

const Entrance = () => {
  return (
    <Container>
      <Buttons activeButton="Entrance" />
      <OperationContainer>
        <Table>
          <TableConfig />
          <EntranceTitle />
          <EntranceData />
          <EntranceLoad />
        </Table>
        <EntranceButton />
      </OperationContainer>
      <EntranceInfo />
    </Container>
  );
};

const OperationContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;
  padding: 30px;
  background-color: #ffff;
`;

export default Entrance;
