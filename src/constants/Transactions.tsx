import { CreditCardBrand, TransactionType } from 'graphql-service/types';

export const addOperationText = {
  [TransactionType.Deposit]: 'addDeposit',
  [TransactionType.FixedExpense]: 'addFixedExpense',
  [TransactionType.CreditCard]: 'addCreditCard',
  [TransactionType.VariableExpense]: 'addVariableExpense',
};

export const CreatedCardBrandText = [
  CreditCardBrand.AmericanExpress,
  CreditCardBrand.Bndes,
  CreditCardBrand.Dinners,
  CreditCardBrand.HiperCard,
  CreditCardBrand.MasterCard,
  CreditCardBrand.Visa,
  CreditCardBrand.SoroCard,
  CreditCardBrand.Elo,
  CreditCardBrand.Other,
];

export const operationType = [
  [TransactionType.Deposit],
  [TransactionType.FixedExpense],
  [TransactionType.CreditCard],
  [TransactionType.VariableExpense],
];
