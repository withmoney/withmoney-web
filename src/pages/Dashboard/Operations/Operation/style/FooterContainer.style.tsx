import styled from 'styled-components';
import Text from '../../../../../components/Text';
import { ArrowCircleDown, ArrowCircleUp, Check } from '@styled-icons/fa-solid/';
import { CreditCard } from '@styled-icons/boxicons-regular';

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  padding: 30px;
`;

export const InfoWrapper = styled.div`
  display: 'flex';
  flex-direction: 'column';
`;

export const Info = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoTitle = styled.div`
  width: '200px';
  text-align: right;
  width: 250px;
  ${Text} {
    padding: 10px 0;
    margin-right: 25px;
  }
`;

export const InfoValue = styled.div`
  width: 150px;
  ${Text} {
    padding: 10px 0;
  }
`;

export const IncomesIcons = styled(ArrowCircleDown)`
  width: 20px;
  color: var(--dashboard-progress-bar-Deposit);
  margin-left: 10px;
`;

export const PaidExpenses = styled(Check)`
  width: 20px;
  color: var(--dashboard-progress-bar-VariableExpense);
  margin-left: 10px;
`;

export const PendingExpensesIcons = styled(ArrowCircleUp)`
  width: 20px;
  color: var(--dashboard-progress-bar-FixedExpense);
  margin-left: 10px;
`;

export const CreditCardExpenses = styled(CreditCard)`
  width: 20px;
  color: var(--dashboard-progress-bar-CreditCard);
  margin-left: 10px;
`;
