import styled from 'styled-components';
import Button from '../components/Button';

export const stylesConfirmModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  content: {
    padding: '0',
    borderRadius: '8px',
    minWidth: '500px',
    top: '200px',
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  content: {
    padding: '0',
    borderRadius: '8px',
    minWidth: '500px',
    top: '300px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    minHeight: '550px',
  },
};

export const ModalHeader = styled.div`
  text-align: center;
  background-color: #c4c4c4;
  padding: 15px;
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
