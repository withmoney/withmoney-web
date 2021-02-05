import { TransactionType } from '../models';

export const addOperationText = {
  [TransactionType.Deposit]: 'Add Income',
  [TransactionType.FixedExpense]: 'Add Expense',
  [TransactionType.CreditCard]: 'Add Expense',
  [TransactionType.VariableExpense]: 'Add Expense',
};

export const operationType = [
  [TransactionType.Deposit],
  [TransactionType.FixedExpense],
  [TransactionType.CreditCard],
  [TransactionType.VariableExpense],
];
