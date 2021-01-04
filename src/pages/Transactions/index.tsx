import React from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/evaicons-solid';
import { Tabs } from './Components/Tabs';
import Table from './Components/Table';
import Button from '../../components/Button';
import Container from './Components/style/Container.style';
import EntranceTitle from './Operation/OperationTitle';
import EntranceData from './Operation/OperationData';
import EntranceLoad from './Operation/TransactionPlaceholder';
import FooterContainer from './Operation/FooterContainer';

const Operation = () => {
  return (
    <Container>
      <Tabs />
      <OperationContainer>
        <Table.Table>
          <Table.Config />
          <EntranceTitle />
          <EntranceData />
          <EntranceLoad />
        </Table.Table>
        <ButtonContent>
          <Button rounded variation="light">
            <Plus />
            <span>Add Entrance</span>
          </Button>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
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

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
`;

export default Operation;
