import React from 'react';
import Modal from 'react-modal';
import Text from '../components/Text';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { ModalBody, ModalHeader, stylesConfirmModal } from './ConfirmModal.style';

type Props = {
  label?: string;
  loading: boolean;
  isOpenModal: boolean;
  confirmButton?: 'primary' | 'danger' | 'light';
  onConfirm: () => void;
  setIsOpenModal: (value: boolean) => void;
};

const ConfirmModal = ({
  confirmButton = 'light',
  loading,
  isOpenModal,
  label = '',
  setIsOpenModal,
  onConfirm,
}: Props) => {
  Modal.setAppElement('body');
  return (
    <>
      <Modal style={stylesConfirmModal} isOpen={isOpenModal}>
        <ModalHeader>
          <Text bold>{label}</Text>
        </ModalHeader>
        <ModalBody>
          <>
            <Button disabled={loading} type="button" onClick={onConfirm} variation={confirmButton}>
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

export default ConfirmModal;
