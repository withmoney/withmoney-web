import { TransactionType, CreditCardBrand } from 'models';

export const addOperationText = {
  [TransactionType.Deposit]: 'addDeposit',
  [TransactionType.FixedExpense]: 'addFixedExpense',
  [TransactionType.CreditCard]: 'addCreditCard',
  [TransactionType.VariableExpense]: 'addVariableExpense',
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
