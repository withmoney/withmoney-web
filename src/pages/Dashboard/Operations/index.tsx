import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { useOperationsFilters } from 'hooks/useOperationsFilters';
import { useAccountFilters } from 'hooks/useAccountFilters';
import { useOperations, useCreateOperation } from 'hooks/useOperations';
import ConfirmModal from 'modals/ConfirmModal';
import { useDeleteOperation, useRestoreOperation } from 'hooks/useOperations';
import { OperationFieldsFragment } from 'graphql-service/types';
import { OperationsDesktop } from './OperationsDesktop';
import useBreakpoint from 'hooks/useBreakpoint';
import { OperationsMobile } from './OperationsMobile';

const Operations = () => {
  const { data, loading } = useOperations();
  const { currentTransactionType, currentDateTime, setCategoryId } = useOperationsFilters();
  const { currentAccount } = useAccountFilters();
  const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectOperation, setSelectOperation] = useState<OperationFieldsFragment>();
  const { createOperation, loading: loadingCreate } = useCreateOperation();
  const { deleteOperation, loading: loadingDelete } = useDeleteOperation();
  const { restoreOperation } = useRestoreOperation();
  const { t } = useTranslation('operations');
  const { isMd } = useBreakpoint();

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
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
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
      toast.error(t<string>('message.operationDeleted'), {
        position: 'bottom-left',
        autoClose: 10000,
        draggable: false,
        onClick: handleRestoreOperation,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
    setModalIsOpen(false);
  };

  //RestoreOperation
  const handleRestoreOperation = async () => {
    try {
      await restoreOperation({ variables: { id: selectOperation?.id } });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { position: 'bottom-left', draggable: false });
      }
    }
  };

  //Filter Operations
  const operations =
    data?.operations?.filter((operation) => operation.type === currentTransactionType) || [];

  return (
    <>
      <ConfirmModal
        label={t('areYouSureThatYouWantDelete')}
        confirmButton="danger"
        isOpenModal={modalIsOpen}
        loading={loadingDelete}
        setIsOpenModal={handleOpenModal}
        onConfirm={handleDeleteOperation}
      />
      {isMd ? (
        <OperationsDesktop
          filterVisibility={filterVisibility}
          toggleFilterVisibility={toggleFilterVisibility}
          currentTransactionType={currentTransactionType}
          onChangeCategoryFilter={onChangeCategoryFilter}
          operations={operations}
          loading={loading}
          setModalIsOpen={setModalIsOpen}
          setSelectOperation={setSelectOperation}
          loadingCreate={loadingCreate}
          handleCreateOperation={handleCreateOperation}
        />
      ) : (
        <OperationsMobile
          filterVisibility={filterVisibility}
          toggleFilterVisibility={toggleFilterVisibility}
          currentTransactionType={currentTransactionType}
          onChangeCategoryFilter={onChangeCategoryFilter}
          operations={operations}
          loading={loading}
          setModalIsOpen={setModalIsOpen}
          setSelectOperation={setSelectOperation}
          loadingCreate={loadingCreate}
          handleCreateOperation={handleCreateOperation}
        />
      )}
    </>
  );
};

export default Operations;
