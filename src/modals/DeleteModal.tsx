import React from 'react';
import Modal from 'react-modal';
import Text from '../components/Text';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { ModalBody, ModalHeader, CustomStyles } from './DeleteModal.style';

type Props = {
  label?: string;
  loading: boolean;
  isOpenModal: boolean;
  handleDelete: () => void;
  setIsOpenModal: (value: boolean) => void;
};

const DeleteModal = ({ loading, isOpenModal, label = '', setIsOpenModal, handleDelete }: Props) => {
  Modal.setAppElement('body');
  return (
    <>
      <Modal style={CustomStyles} isOpen={isOpenModal}>
        <ModalHeader>
          <Text bold>Are you sure that you want to delete this {label}?</Text>
        </ModalHeader>
        <ModalBody>
          <>
            <Button disabled={loading} type="button" onClick={handleDelete} variation="danger">
              {loading ? <LoadingSpinner size="20px" /> : 'Yes'}
            </Button>
            <Button disabled={loading} type="button" onClick={() => setIsOpenModal(false)}>
              No
            </Button>
          </>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DeleteModal;
