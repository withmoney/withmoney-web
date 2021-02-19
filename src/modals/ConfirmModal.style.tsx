import Modal from 'react-modal';
import styled from 'styled-components';
import Button from 'components/Button';

export const stylesConfirmModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  content: {
    padding: '0',
    borderRadius: '8px',
    minWidth: '500px',
    top: '180px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
};

export const stylesCreditCard = {
  overlay: {
    inset: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    padding: '0',
    background: 'rgb(255, 255, 255)',
    borderRadius: '8px',
    outline: 'none',
    maxWidth: '500px',
    width: '100%',
    marginTop: '40px',
  },
};

export const ModalHeader = styled.div`
  text-align: center;
  background-color: #c4c4c4;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 28px 20px;
  ${Button} {
    width: 86px;
    height: 41px;
    margin-right: 13px;
  }
`;

export const StyledModal = styled(Modal)`
  .ReactModal__Body--open {
    overflow: hidden;
  }
`;

export const Label = styled.label`
  padding: 5px;
`;
