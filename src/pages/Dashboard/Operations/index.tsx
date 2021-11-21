import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { PlusCircle, MinusCircle } from '@styled-icons/boxicons-regular';
import { Tabs } from 'components/Tabs';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { useAccountFilters } from 'hooks/useAccountFilters';
import DataPlaceholder from './Operation/DataPlaceholder';
import OperationItem from './Operation/OperationItem';
import FooterContainer from './Operation/FooterContainer';
import OperationPlaceholder from './Operation/OperationPlaceholder';
import { Operation } from 'models';
import { Container, OperationContainer, ButtonContent } from './style/Operations.style';
import { OperationButton } from './style/Operations.style';
import { RowHeader, CellHeader } from './Operation/style/OperationSettings';
import { useOperations, useCreateOperation } from 'hooks/useOperations';
import ConfirmModal from 'modals/ConfirmModal';
import { addOperationText } from 'constants/Transactions';
import LoadingSpinner from 'components/LoadingSpinner';
import { TransactionType } from 'models';
import Text from 'components/Text';
import { useDeleteOperation, useRestoreOperation } from 'hooks/useOperations';
import OperationFilter from './OperationFilter';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType, currentDateTime, setCategoryId } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();
  const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectOperation, setSelectOperation] = useState<Operation>();
  const { createOperation, loading: loadingCreate } = useCreateOperation();
  const { deleteOperation, loading: loadingDelete } = useDeleteOperation();
  const { restoreOperation } = useRestoreOperation();
  const { t } = useTranslation('operations');

  //openModal
  const handleOpenModal = (value: boolean) => {
    setModalIsOpen(value);
  };

  const toggleFilterVisibility = () => setFilterVisibility(!filterVisibility);

  const onChangeCategoryFilter = (categoryId: string | null) => setCategoryId(categoryId);

  //CreateOperation
  const handleCreateOperation = async () => {
    if (!currentDateTime) {
      throw new Error('currentDateTime is undefined');
    }

    const verify = DateTime.local() > currentDateTime.endOf('month');
    try {
      await createOperation({
        variables: {
          type: currentTransactionType,
          accountID: currentAccount?.id,
          paidAt: verify ? currentDateTime.endOf('month').toISO() : currentDateTime,
        },
      });
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
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
      toast.error(t('message.operationDeleted'), {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000,
        draggable: false,
        onClick: handleRestoreOperation,
      });
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
    setModalIsOpen(false);
  };

  //RestoreOperation
  const handleRestoreOperation = async () => {
    try {
      await restoreOperation({ variables: { id: selectOperation?.id } });
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
  };

  //Filter Operations
  const operations =
    data?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <Container>
      <ConfirmModal
        label={t('areYouSureThatYouWantDelete')}
        confirmButton="danger"
        isOpenModal={modalIsOpen}
        loading={loadingDelete}
        setIsOpenModal={handleOpenModal}
        onConfirm={handleDeleteOperation}
      />
      <Tabs filterVisibility={filterVisibility} onToggleFilterVisibility={toggleFilterVisibility} />
      <OperationContainer>
        {filterVisibility && currentTransactionType && (
          <OperationFilter type={currentTransactionType} onChange={onChangeCategoryFilter} />
        )}
        <RowHeader>
          <CellHeader width="80px">{t('isPaid')}</CellHeader>
          <CellHeader width="130px">{t('date')}</CellHeader>
          <CellHeader flex="1">{t('name')}</CellHeader>
          <CellHeader flex="1">{t('category')}</CellHeader>
          {currentTransactionType === TransactionType.CreditCard && (
            <CellHeader width="200px">{t('creditCard')}</CellHeader>
          )}
          <CellHeader width="200px">{t('value')}</CellHeader>
          <CellHeader width="56px">{t('action')}</CellHeader>
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
        {!loading && !operations.length && <OperationPlaceholder onClick={handleCreateOperation} />}
        <ButtonContent>
          <OperationButton
            variation="primary"
            color={currentTransactionType || 'Deposit'}
            disabled={loadingCreate}
            onClick={handleCreateOperation}
            type="button"
            rounded
          >
            {loadingCreate ? (
              <LoadingSpinner inButton size="20px" />
            ) : currentTransactionType === 'Deposit' ? (
              <PlusCircle />
            ) : (
              <MinusCircle />
            )}
            <span>
              <Text variation="white">
                {t(addOperationText[currentTransactionType || 'Deposit'])}
              </Text>
            </span>
          </OperationButton>
        </ButtonContent>
      </OperationContainer>
      <FooterContainer />
    </Container>
  );
};

export default Operations;
