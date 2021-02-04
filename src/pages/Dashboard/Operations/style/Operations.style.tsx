import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import Button from '../../../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;

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

type Props = {
  color: 'Deposit' | 'FixedExpense' | 'CreditCard' | 'VariableExpense';
};

export const OperationButton = styled(Button)<Props>`
  border: none;
  background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color})`};
  &:hover {
    background-color: ${({ color }) => color && `var(--dashboard-progress-bar-${color}-hover)`};
  }

  svg {
    width: 100px;
  }

  ${StyledIconBase} {
    color: ${({ variation = 'default' }) => `var(--button-${variation}-color)`};
    font-size: 22px;
    width: 22px;
  }
`;
