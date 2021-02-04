import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Plus } from '@styled-icons/fa-solid';
import { Tabs } from '../../../components/Tabs';
import Button from '../../../components/Button';
import { useOperationsFilters } from '../../../hooks/useOperationsFilters';
import { useAccountFilters } from '../../../hooks/useAccountFilters';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import { Operation } from '../../../models';
import { Container, OperationContainer, ButtonContent } from './style/Operations.style';
import { RowHeader, CellHeader } from './Operation/style/OperationSettings';
import { useOperations, useCreateOperation } from '../../../hooks/useOperations';
import ConfirmModal from '../../../modals/ConfirmModal';
import { addOperationText } from '../../../constants/Transactions';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Text from '../../../components/Text';
import { useDeleteOperation, useRestoreOperation } from '../../../hooks/useOperations';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType, currentDateTime } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectOperation, setSelectOperation] = useState<Operation>();
  const { createOperation, loading: loadingCreate } = useCreateOperation();
  const { deleteOperation, loading: loadingDelete } = useDeleteOperation();
  const { restoreOperation } = useRestoreOperation();

  //openModal
  const handleOpenModal = (value: boolean) => {
    setModalIsOpen(value);
  };

  //CreateOperation
  const handleCreateOperation = () => {
    const verify =
      (currentDateTime?.toISO() || '') > (currentDateTime?.endOf('month').toISO() || '');
    try {
      createOperation({
        variables: {
          type: currentTransactionType,
          accountID: currentAccount?.id,
          paidAt: verify ? currentDateTime?.endOf('month').toISO() : currentDateTime,
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  //DeleteOperation
  const handleDeleteOperation = async () => {
    try {
      await deleteOperation({
        variables: {
          id: selectOperation?.id,
        },
      });
      toast.error('Operation deleted. Click here to restore!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000,
        draggable: false,
        onClick: handleRestoreOperation,
      });
    } catch (err) {
      toast.error(err.message);
    }
    setModalIsOpen(false);
  };

  //RestoreOperation
  const handleRestoreOperation = async () => {
    try {
      await restoreOperation({ variables: { id: selectOperation?.id } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Filter Operations
  const operations =
    data?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <Container>
      <ConfirmModal
        label="Are you sure that you want to delete this operation?"
        confirmButton="danger"
        isOpenModal={modalIsOpen}
        loading={loadingDelete}
        setIsOpenModal={handleOpenModal}
        onConfirm={handleDeleteOperation}
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
          <OperationButton
            variation="primary"
            color={currentTransactionType || 'Deposit'}
            disabled={loadingCreate}
            onClick={handleCreateOperation}
            type="button"
            rounded
          >
            {loadingCreate ? <LoadingSpinner inButton size="20px" /> : <Plus color="blue" />}
            <span>
              <Text variation="white">{addOperationText[currentTransactionType || 'Deposit']}</Text>
            </span>
          </OperationButton>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
    </Container>
  );
};

type Props = {
  color: 'Deposit' | 'FixedExpense' | 'CreditCard' | 'VariableExpense';
};

const OperationButton = styled(Button)<Props>`
  border: none;
  background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color})`};
  &:hover {
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color}-hover)`};
  }
`;

export default Operations;
