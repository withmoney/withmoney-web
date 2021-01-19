import React from 'react';
import styled from 'styled-components';
import { Plus } from '@styled-icons/evaicons-solid';
import { Tabs } from '../../../components/Tabs';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import { useOperations } from '../../../hooks/useOperations';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import Container from './style/Container.style';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType } = useOperationsFilters();

  const operations =
    data?.me?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <Container>
      <Tabs />
      <OperationContainer>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Is Paid?</Table.Cell>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Category</Table.Cell>
              <Table.Cell>Value</Table.Cell>
              <Table.Cell>Action</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DataPlaceholder isLoading={loading} />
            {!!operations.length &&
              operations.map((operation) => (
                <OperationItem key={operation.id} operation={operation} />
              ))}
          </Table.Body>
          {!loading && !operations.length && <OperationPlaceholder />}
        </Table>
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
  margin-top: 20px;
`;

export default Operations;
