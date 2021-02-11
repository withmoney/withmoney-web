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

export enum CreditCardBrand {
  AmericanExpress = 'AmericanExpress',
  BNDES = 'BNDES',
  Dinners = 'Dinners',
  ELO = 'ELO',
  HiperCard = 'HiperCard',
  MasterCard = 'MasterCard',
  Other = 'Other',
  SoroCard = 'SoroCard',
  Visa = 'Visa',
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
  creditCardId: String;
  creditCard: CreditCard;
}

export interface CreditCard {
  id: string;
  name: string;
  brand: CreditCardBrand;
  limit: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user: User;
  userId: string;
  account: Account;
  accountId: string;
  operations: Operation[];
}

export interface Me extends User {}

export interface FindManyCategory {
  categories: DataCategories;
}

export type CreditCards = {
  allCreditCards: DataCreditCards;
};

export type DataCreditCards = {
  data: CreditCard[];
};

type DataCategories = {
  data: Category[];
  pagination: TotalItems;
};

type TotalItems = {
  totalItems: number;
};
