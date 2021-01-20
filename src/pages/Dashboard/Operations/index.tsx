import React, { useState } from 'react';
import { Plus } from '@styled-icons/evaicons-solid';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { Tabs } from '../../../components/Tabs';
import Text from '../../../components/Text';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import { Operation } from '../../../models';
import {
  Container,
  CustomStyles,
  ModelHeader,
  ModelBody,
  OperationContainer,
  ButtonContent,
} from './style/Operations.style';
import {
  useOperations,
  useDeleteOperation,
  useRestoreOperation,
} from '../../../hooks/useOperations';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType } = useOperationsFilters();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectOperation, setSelectOperation] = useState<Operation>();
  const { deleteOperation } = useDeleteOperation();
  const { restoreOperation } = useRestoreOperation();

  const handleRestoreOperation = () => {
    restoreOperation({ variables: { id: selectOperation?.id } });
  };

  const handleDeleteOperation = () => {
    try {
      deleteOperation({
        variables: {
          id: selectOperation?.id,
        },
      });
      setModalIsOpen(false);
      toast.dark('Operation deleted click here to restore!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 15000,
        onClick: handleRestoreOperation,
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const changeButtonText = () => {
    switch (currentTransactionType) {
      case 'Deposit':
        return 'Add Entrance';
      case 'CreditCard':
        return 'Add Credit';
      case 'FixedExpense':
        return 'Add Recurrent';
      case 'VariableExpense':
        return 'Add Unforeseen';
      default:
        'Deposit';
    }
  };

  const operations =
    data?.me?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <Container>
      <Modal style={CustomStyles} isOpen={modalIsOpen}>
        <ModelHeader>
          <Text bold>
            Are you sure that you want to delete&nbsp;
            {selectOperation?.name.length ? selectOperation.name : 'untitled operation'}?
          </Text>
        </ModelHeader>
        <ModelBody>
          <Button type="button" onClick={handleDeleteOperation} variation="danger">
            Yes
          </Button>
          <Button type="button" onClick={() => setModalIsOpen(false)}>
            No
          </Button>
        </ModelBody>
      </Modal>
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
                <OperationItem
                  modalIsOpen={setModalIsOpen}
                  deleteOperation={setSelectOperation}
                  key={operation.id}
                  operation={operation}
                />
              ))}
          </Table.Body>
          {!loading && !operations.length && <OperationPlaceholder />}
        </Table>
        <ButtonContent>
          <Button type="button" rounded variation="light">
            <Plus />
            <span>{changeButtonText()}</span>
          </Button>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
    </Container>
  );
};

export default Operations;
