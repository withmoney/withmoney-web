import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Text from '../components/Text';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { Operation } from '../models';
import { useDeleteOperation, useRestoreOperation } from '../hooks/useOperations';
import { ModalBody, ModalHeader, CustomStyles } from './DeleteOperationModal.style';

type Props = {
  modalIsOpen: boolean;
  operation: Operation | undefined;
  setIsOpenModal: (value: boolean) => void;
};

const DeleteOperationModal = ({ modalIsOpen, operation, setIsOpenModal }: Props) => {
  const { deleteOperation, loading } = useDeleteOperation();
  const { restoreOperation } = useRestoreOperation();

  const handleDeleteOperation = async () => {
    try {
      await deleteOperation({
        variables: {
          id: operation?.id,
        },
      });
      toast.dark('Operation deleted. Click here to restore!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 15000,
        onClick: handleRestoreOperation,
      });
    } catch (err) {
      toast.error(err.message);
    }
    setIsOpenModal(false);
  };

  const handleRestoreOperation = async () => {
    try {
      await restoreOperation({ variables: { id: operation?.id } });
    } catch (err) {
      toast.error(err.message);
    }
  };

  Modal.setAppElement('body');
  return (
    <>
      <Modal style={CustomStyles} isOpen={modalIsOpen}>
        <ModalHeader>
          <Text bold>
            Are you sure that you want to delete this{' '}
            {operation?.name ? operation.name : 'operation'}?
          </Text>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button type="button" onClick={handleDeleteOperation} variation="danger">
                Yes
              </Button>
              <Button type="button" onClick={() => setIsOpenModal(false)}>
                No
              </Button>
            </>
          )}
        </ModalBody>
      </Modal>
      ;
    </>
  );
};

export default DeleteOperationModal;
