import { CreditCardBrand, TransactionType } from 'graphql-service/types';

export const addOperationText = {
  [TransactionType.Income]: 'addIncome',
  [TransactionType.Expense]: 'addExpense',
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

export const transactionType = [[TransactionType.Income], [TransactionType.Expense]];
