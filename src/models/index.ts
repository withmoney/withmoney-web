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

export enum Locale {
  ptBR = 'ptBR',
  enUS = 'enUS',
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
  language: Locale;
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

export interface Categories {
  categories: DataCategories;
}

export type CreditCards = {
  creditCards: DataCreditCards;
};

export type DataCreditCards = {
  data: CreditCard[];
  pagination: Pagination;
};

export type DataCategories = {
  data: Category[];
  pagination: Pagination;
};

export type AllCreditCardsLimit = {
  allCreditCardsLimit: CreditCardLimit[];
};

export interface Pagination {
  totalItems: number;
}

export interface Operations {
  operations: Operation[];
  balance: Balance;
}

type Balance = {
  amount: number;
};

type CreditCardLimit = {
  limit: number;
  limitFree: number;
  limitBlocked: number;
  creditCard: CreditCardInfo;
};

type CreditCardInfo = {
  id: string;
  name: string;
};
