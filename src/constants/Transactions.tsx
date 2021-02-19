import { TransactionType, CreditCardBrand } from 'models';

export const addOperationText = {
  [TransactionType.Deposit]: 'Add Income',
  [TransactionType.FixedExpense]: 'Add Expense',
  [TransactionType.CreditCard]: 'Add Expense',
  [TransactionType.VariableExpense]: 'Add Expense',
};

export const CreatedCardBrandText = [
  CreditCardBrand.AmericanExpress,
  CreditCardBrand.BNDES,
  CreditCardBrand.Dinners,
  CreditCardBrand.HiperCard,
  CreditCardBrand.MasterCard,
  CreditCardBrand.Visa,
  CreditCardBrand.SoroCard,
  CreditCardBrand.ELO,
  CreditCardBrand.Other,
];

export const operationType = [
  [TransactionType.Deposit],
  [TransactionType.FixedExpense],
  [TransactionType.CreditCard],
  [TransactionType.VariableExpense],
];
