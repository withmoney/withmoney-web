import { TransactionType } from '../models';

export const addOperationText = {
  [TransactionType.Deposit]: 'Add Entrance',
  [TransactionType.FixedExpense]: 'Add Recurrent',
  [TransactionType.CreditCard]: 'Add Credit',
  [TransactionType.VariableExpense]: 'Add Unforeseen',
};

export const operationType = [
  [TransactionType.Deposit],
  [TransactionType.FixedExpense],
  [TransactionType.CreditCard],
  [TransactionType.VariableExpense],
];
