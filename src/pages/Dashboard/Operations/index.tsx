import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus } from '@styled-icons/evaicons-solid';
import { Tabs } from '../../../components/Tabs';
import Button from '../../../components/Button';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import { Operation } from '../../../models';
import { Container, OperationContainer, ButtonContent } from './style/Operations.style';
import { RowHeader, CellHeader } from './Operation/style/OperationSettings';
import { useOperations, useCreateOperation } from '../../../hooks/useOperations';
import DeleteOperationModal from '../../../modals/DeleteOperationModal';
import { addOperationText } from '../../../constants/Transactions';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType, currentAccountId, currentDateTime } = useOperationsFilters();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectOperation, setSelectOperation] = useState<Operation>();
  const { createOperation } = useCreateOperation();

  const handleOpenModal = (value: boolean) => {
    setModalIsOpen(value);
  };

  const handleCreateOperation = () => {
    try {
      createOperation({
        variables: {
          type: currentTransactionType,
          accountID: currentAccountId,
          paidAt: currentDateTime?.endOf('month'),
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const operations =
    data?.me?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <Container>
      <DeleteOperationModal
        modalIsOpen={modalIsOpen}
        operation={selectOperation}
        setIsOpenModal={handleOpenModal}
      />
      <Tabs />
      <OperationContainer>
        <RowHeader>
          <CellHeader width="80px">Is Paid?</CellHeader>
          <CellHeader width="130px">Date</CellHeader>
          <CellHeader flex="1">Name</CellHeader>
          <CellHeader flex="1">Category</CellHeader>
          <CellHeader width="200px">Value</CellHeader>
          <CellHeader width="56px">Action</CellHeader>
        </RowHeader>
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
        {!loading && !operations.length && <OperationPlaceholder />}
        <ButtonContent>
          <Button onClick={handleCreateOperation} type="button" rounded variation="light">
            <Plus />
            <span>{addOperationText[currentTransactionType || 'Deposit']}</span>
          </Button>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
    </Container>
  );
};

export default Operations;
