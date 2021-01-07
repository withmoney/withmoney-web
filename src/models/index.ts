export enum TransactionType {
  CreditCard,
  Deposit,
  FixedExpense,
  VariableExpense,
}

export interface Account {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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
  updatedAt: string;
  deletedAt: string;
  account: Account;
  user: User;
  category: Category;
}

export interface Me extends User {}
