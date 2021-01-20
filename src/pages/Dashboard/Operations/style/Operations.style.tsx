import styled from 'styled-components';
import Button from '../../../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;

export const CustomStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  content: {
    padding: '0',
    borderRadius: '8px',
    minWidth: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
};

export const OperationContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;
  padding: 30px;
  background-color: #ffff;
`;

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ModelHeader = styled.div`
  text-align: center;
  background-color: #c4c4c4;
  padding: 15px;
`;

export const ModelBody = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 28px 20px;
  ${Button} {
    width: 86px;
    height: 41px;
    margin-right: 13px;
  }
`;
