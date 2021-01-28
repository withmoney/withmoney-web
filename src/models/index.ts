export enum TransactionType {
  CreditCard = 'CreditCard',
  Deposit = 'Deposit',
  FixedExpense = 'FixedExpense',
  VariableExpense = 'VariableExpense',
}

export enum CurrenciesTypes {
  USD = 'USD',
  EUR = 'EUR',
  BRL = 'BRL',
  GBP = 'GBP',
}

export interface Account {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  currency: CurrenciesTypes;
  user: User;
  operations: Operation[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hasVerifiedEmail: boolean;
  birthDay: string;
  accounts: Account[];
  categories: Category[];
  operations: Operation[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user: User;
  operations: Operation[];
}

export interface Operation {
  id: string;
  name: string;
  value: number;
  isPaid: boolean;
  type: TransactionType;
  createdAt: string;
  paidAt: string;
  updatedAt: string;
  deletedAt: string | null;
  account: Account;
  user: User;
  category: Category | null;
  categoryId: string | null;
  accountId: string;
  userId: string;
}

export interface Me extends User {}

export type Data = {
  me: User;
};
