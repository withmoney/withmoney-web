export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
};

export type Account = {
  __typename?: 'Account';
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type AccountCreateInput = {
  currency?: InputMaybe<Currency>;
  name: Scalars['String']['input'];
};

export type AccountOrderByInput = {
  currency?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type AccountUpdateInput = {
  currency?: InputMaybe<Currency>;
  name: Scalars['String']['input'];
};

export type AccountWhereInput = {
  currency?: InputMaybe<Currency>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AccountWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type AuthPayloada = {
  __typename?: 'AuthPayloada';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CalcCreditCardsLimitResults = {
  __typename?: 'CalcCreditCardsLimitResults';
  creditCard?: Maybe<CreditCard>;
  limit?: Maybe<Scalars['Float']['output']>;
  limitBlocked?: Maybe<Scalars['Float']['output']>;
  limitFree?: Maybe<Scalars['Float']['output']>;
};

export type CalcCreditCardsLimitWhereInput = {
  accountId: Scalars['ID']['input'];
};

export type CalcCreditCardWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type CalcPreviousBalancePaidAtInput = {
  lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CalcPreviousBalanceResult = {
  __typename?: 'CalcPreviousBalanceResult';
  amount?: Maybe<Scalars['Float']['output']>;
};

export type CalcPreviousBalanceWhereInput = {
  accountId: Scalars['String']['input'];
  paidAt?: InputMaybe<CalcPreviousBalancePaidAtInput>;
};

export type CategoriesResult = {
  __typename?: 'CategoriesResult';
  data?: Maybe<Array<Maybe<Category>>>;
  pagination?: Maybe<Pagination>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CategoryCreateInput = {
  name: Scalars['String']['input'];
  type: TransactionType;
};

export type CategoryOrderByInput = {
  name?: InputMaybe<SortOrder>;
};

export type CategoryUpdateInput = {
  name: Scalars['String']['input'];
  type: TransactionType;
};

export type CategoryWhereInput = {
  deletedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<TransactionTypeFilter>;
};

export type CategoryWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type CreditCard = {
  __typename?: 'CreditCard';
  account: Account;
  brand: CreditCardBrand;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  limit: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum CreditCardBrand {
  AmericanExpress = 'AmericanExpress',
  Bndes = 'BNDES',
  Dinners = 'Dinners',
  Elo = 'ELO',
  HiperCard = 'HiperCard',
  MasterCard = 'MasterCard',
  Other = 'Other',
  SoroCard = 'SoroCard',
  Visa = 'Visa',
}

export type CreditCardCreateInput = {
  accountId: Scalars['String']['input'];
  brand: CreditCardBrand;
  limit: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreditCardLimitResult = {
  __typename?: 'CreditCardLimitResult';
  limit?: Maybe<Scalars['Float']['output']>;
  limitBlocked?: Maybe<Scalars['Float']['output']>;
  limitFree?: Maybe<Scalars['Float']['output']>;
};

export type CreditCardOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  expirationDate?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
};

export type CreditCardsResult = {
  __typename?: 'CreditCardsResult';
  data?: Maybe<Array<Maybe<CreditCard>>>;
  pagination?: Maybe<Pagination>;
};

export type CreditCardUpdateInput = {
  accountId: Scalars['String']['input'];
  brand: CreditCardBrand;
  limit: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreditCardWhereInput = {
  accountId?: InputMaybe<IdFilter>;
  cvv?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
  number?: InputMaybe<Scalars['String']['input']>;
};

export type CreditCardWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export enum Currency {
  Brl = 'BRL',
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD',
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FilterString = {
  contains?: InputMaybe<Scalars['String']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
};

export enum Locale {
  EnUs = 'enUS',
  PtBr = 'ptBR',
}

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Scalars['String']['output']>;
  changeUserPassword?: Maybe<Scalars['String']['output']>;
  checkHashEmail?: Maybe<Scalars['String']['output']>;
  createOneAccount: Account;
  createOneCategory: Category;
  createOneCreditCard: CreditCard;
  createOneOperation: Operation;
  deleteOneAccount?: Maybe<Account>;
  deleteOneCategory?: Maybe<Category>;
  deleteOneCreditCard?: Maybe<CreditCard>;
  deleteOneOperation?: Maybe<Operation>;
  login?: Maybe<AuthPayloada>;
  register?: Maybe<Scalars['String']['output']>;
  requestChangePassword?: Maybe<Scalars['String']['output']>;
  restoreOneAccount?: Maybe<Account>;
  restoreOneCategory?: Maybe<Category>;
  restoreOneCreditCard?: Maybe<CreditCard>;
  restoreOneOperation?: Maybe<Operation>;
  updateOneAccount: Account;
  updateOneCategory: Category;
  updateOneCreditCard: CreditCard;
  updateOneOperation: Operation;
  updateOneUser: User;
};

export type MutationChangePasswordArgs = {
  hash: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationChangeUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type MutationCheckHashEmailArgs = {
  hash: Scalars['String']['input'];
};

export type MutationCreateOneAccountArgs = {
  data: AccountCreateInput;
};

export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};

export type MutationCreateOneCreditCardArgs = {
  data: CreditCardCreateInput;
};

export type MutationCreateOneOperationArgs = {
  data: OperationCreateInput;
};

export type MutationDeleteOneAccountArgs = {
  where: AccountWhereUniqueInput;
};

export type MutationDeleteOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};

export type MutationDeleteOneCreditCardArgs = {
  where: CreditCardWhereUniqueInput;
};

export type MutationDeleteOneOperationArgs = {
  where: OperationWhereUniqueInput;
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  user: RegisterInput;
};

export type MutationRequestChangePasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationRestoreOneAccountArgs = {
  where: AccountWhereUniqueInput;
};

export type MutationRestoreOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};

export type MutationRestoreOneCreditCardArgs = {
  where: CreditCardWhereUniqueInput;
};

export type MutationRestoreOneOperationArgs = {
  where: OperationWhereUniqueInput;
};

export type MutationUpdateOneAccountArgs = {
  data: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};

export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type MutationUpdateOneCreditCardArgs = {
  data: CreditCardUpdateInput;
  where: CreditCardWhereUniqueInput;
};

export type MutationUpdateOneOperationArgs = {
  data: OperationUpdateInput;
  where: OperationWhereUniqueInput;
};

export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
};

export type Operation = {
  __typename?: 'Operation';
  account: Account;
  accountId: Scalars['String']['output'];
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creditCard?: Maybe<CreditCard>;
  creditCardId?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type OperationCreateInput = {
  accountId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  creditCardId?: InputMaybe<Scalars['String']['input']>;
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionType;
  value: Scalars['Float']['input'];
};

export type OperationOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  isPaid?: InputMaybe<SortOrder>;
  paidAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type OperationUpdateInput = {
  accountId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  creditCardId?: InputMaybe<Scalars['String']['input']>;
  isPaid: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionType;
  value: Scalars['Float']['input'];
};

export type OperationWhereInput = {
  accountId?: InputMaybe<StringFilter>;
  creditCardId?: InputMaybe<Scalars['ID']['input']>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  paidAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type OperationWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type Pagination = {
  __typename?: 'Pagination';
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  calcManyCreditCardLimit: Array<CalcCreditCardsLimitResults>;
  calcPreviousBalance: CalcPreviousBalanceResult;
  calcUniqueCreditCardLimit: CreditCardLimitResult;
  findManyAccount: Array<Account>;
  findManyCategory: CategoriesResult;
  findManyCreditCard: CreditCardsResult;
  findManyOperation: Array<Operation>;
  findUniqueAccount?: Maybe<Account>;
  findUniqueCategory?: Maybe<Category>;
  findUniqueCreditCard?: Maybe<CreditCard>;
  me?: Maybe<User>;
};

export type QueryCalcManyCreditCardLimitArgs = {
  where: CalcCreditCardsLimitWhereInput;
};

export type QueryCalcPreviousBalanceArgs = {
  where: CalcPreviousBalanceWhereInput;
};

export type QueryCalcUniqueCreditCardLimitArgs = {
  where: CalcCreditCardWhereUniqueInput;
};

export type QueryFindManyAccountArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<AccountOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryFindManyCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<CategoryOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};

export type QueryFindManyCreditCardArgs = {
  cursor?: InputMaybe<CreditCardWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<CreditCardOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CreditCardWhereInput>;
};

export type QueryFindManyOperationArgs = {
  cursor?: InputMaybe<OperationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<OperationOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OperationWhereInput>;
};

export type QueryFindUniqueAccountArgs = {
  where?: InputMaybe<AccountWhereUniqueInput>;
};

export type QueryFindUniqueCategoryArgs = {
  where?: InputMaybe<CategoryWhereUniqueInput>;
};

export type QueryFindUniqueCreditCardArgs = {
  where?: InputMaybe<CreditCardWhereUniqueInput>;
};

export type RegisterInput = {
  currency?: InputMaybe<Currency>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  language?: InputMaybe<Locale>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userSignedIn?: Maybe<User>;
  userUpdated?: Maybe<User>;
};

export type SubscriptionUserSignedInArgs = {
  userId: Scalars['String']['input'];
};

export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['String']['input'];
};

export enum TransactionType {
  CreditCard = 'CreditCard',
  Deposit = 'Deposit',
  FixedExpense = 'FixedExpense',
  VariableExpense = 'VariableExpense',
}

export type TransactionTypeFilter = {
  equals?: InputMaybe<TransactionType>;
  in?: InputMaybe<Array<InputMaybe<TransactionType>>>;
  not?: InputMaybe<TransactionType>;
  notIn?: InputMaybe<Array<InputMaybe<TransactionType>>>;
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  birthDay?: Maybe<Scalars['DateTime']['output']>;
  categories: Array<Category>;
  createdAt: Scalars['DateTime']['output'];
  creditCards: Array<CreditCard>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  hasVerifiedEmail: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  language: Locale;
  lastName: Scalars['String']['output'];
  operations: Array<Operation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserUpdateInput = {
  birthDay?: InputMaybe<Scalars['Date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Locale>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type GetAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAccountsQuery = {
  __typename?: 'Query';
  accounts: Array<{ __typename?: 'Account'; id: string; name: string; currency: Currency }>;
};

export type GetUniqueAccountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetUniqueAccountQuery = {
  __typename?: 'Query';
  findUniqueAccount?: {
    __typename?: 'Account';
    id: string;
    name: string;
    currency: Currency;
    deletedAt?: string | null;
  } | null;
};

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String']['input'];
  currency: Currency;
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createOneAccount: { __typename?: 'Account'; id: string; name: string };
};

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  currency: Currency;
}>;

export type UpdateAccountMutation = {
  __typename?: 'Mutation';
  updateOneAccount: { __typename?: 'Account'; id: string; name: string };
};

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteAccountMutation = {
  __typename?: 'Mutation';
  deleteOneAccount?: { __typename?: 'Account'; id: string; name: string } | null;
};

export type RestoreAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RestoreAccountMutation = {
  __typename?: 'Mutation';
  restoreOneAccount?: { __typename?: 'Account'; id: string; name: string } | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    language: Locale;
    createdAt: string;
    deletedAt?: string | null;
  } | null;
};

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type UserLoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'AuthPayloada'; token?: string | null } | null;
};

export type UserRegisterMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  currency?: InputMaybe<Currency>;
  language?: InputMaybe<Locale>;
}>;

export type UserRegisterMutation = { __typename?: 'Mutation'; register?: string | null };

export type CheckHashMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;

export type CheckHashMutation = { __typename?: 'Mutation'; checkHashEmail?: string | null };

export type RequestChangePasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type RequestChangePasswordMutation = {
  __typename?: 'Mutation';
  requestChangePassword?: string | null;
};

export type ChangePasswordMutationVariables = Exact<{
  hash: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword?: string | null };

export type FilterCategoriesQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<TransactionType>;
}>;

export type FilterCategoriesQuery = {
  __typename?: 'Query';
  categories: {
    __typename?: 'CategoriesResult';
    data?: Array<{
      __typename?: 'Category';
      id: string;
      name: string;
      type: TransactionType;
      deletedAt?: string | null;
    } | null> | null;
    pagination?: { __typename?: 'Pagination'; totalItems?: number | null } | null;
  };
};

export type GetUniqueCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetUniqueCategoryQuery = {
  __typename?: 'Query';
  findUniqueCategory?: {
    __typename?: 'Category';
    id: string;
    name: string;
    type: TransactionType;
  } | null;
};

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type: TransactionType;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createOneCategory: { __typename?: 'Category'; id: string; name: string };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteOneCategory?: {
    __typename?: 'Category';
    id: string;
    name: string;
    deletedAt?: string | null;
  } | null;
};

export type RestoreCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RestoreCategoryMutation = {
  __typename?: 'Mutation';
  restoreOneCategory?: { __typename?: 'Category'; id: string; name: string } | null;
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: TransactionType;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateOneCategory: { __typename?: 'Category'; id: string; name: string };
};

export type FilterCreditCardQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type FilterCreditCardQuery = {
  __typename?: 'Query';
  creditCards: {
    __typename?: 'CreditCardsResult';
    data?: Array<{
      __typename?: 'CreditCard';
      id: string;
      name: string;
      brand: CreditCardBrand;
      limit: number;
    } | null> | null;
    pagination?: { __typename?: 'Pagination'; totalItems?: number | null } | null;
  };
};

export type GetUniqueCreditCardQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetUniqueCreditCardQuery = {
  __typename?: 'Query';
  findUniqueCreditCard?: {
    __typename?: 'CreditCard';
    id: string;
    name: string;
    limit: number;
    brand: CreditCardBrand;
  } | null;
};

export type AllCreditCardLimitQueryVariables = Exact<{
  accountId: Scalars['ID']['input'];
}>;

export type AllCreditCardLimitQuery = {
  __typename?: 'Query';
  allCreditCardsLimit: Array<{
    __typename?: 'CalcCreditCardsLimitResults';
    limit?: number | null;
    limitFree?: number | null;
    limitBlocked?: number | null;
    creditCard?: { __typename?: 'CreditCard'; id: string; name: string } | null;
  }>;
};

export type CreateCreditCardMutationVariables = Exact<{
  name: Scalars['String']['input'];
  limit: Scalars['Float']['input'];
  brand: CreditCardBrand;
  account: Scalars['String']['input'];
}>;

export type CreateCreditCardMutation = {
  __typename?: 'Mutation';
  createOneCreditCard: {
    __typename?: 'CreditCard';
    id: string;
    name: string;
    limit: number;
    brand: CreditCardBrand;
  };
};

export type DeleteCreditCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteCreditCardMutation = {
  __typename?: 'Mutation';
  deleteOneCreditCard?: {
    __typename?: 'CreditCard';
    id: string;
    name: string;
    deletedAt?: string | null;
  } | null;
};

export type UpdateCreditCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  limit: Scalars['Float']['input'];
  brand: CreditCardBrand;
  account: Scalars['String']['input'];
}>;

export type UpdateCreditCardMutation = {
  __typename?: 'Mutation';
  updateOneCreditCard: { __typename?: 'CreditCard'; id: string; name: string };
};

export type RestoreCreditCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RestoreCreditCardMutation = {
  __typename?: 'Mutation';
  restoreOneCreditCard?: { __typename?: 'CreditCard'; id: string; name: string } | null;
};

export type OperationFieldsFragment = {
  __typename?: 'Operation';
  id: string;
  name: string;
  value: number;
  type: TransactionType;
  isPaid: boolean;
  paidAt?: string | null;
  createdAt: string;
  accountId: string;
  categoryId?: string | null;
  creditCardId?: string | null;
};

export type GetOperationsQueryVariables = Exact<{
  startDateTime: Scalars['DateTime']['input'];
  where?: InputMaybe<OperationWhereInput>;
  orderBy?: InputMaybe<Array<OperationOrderByInput> | OperationOrderByInput>;
  accountId: Scalars['String']['input'];
}>;

export type GetOperationsQuery = {
  __typename?: 'Query';
  operations: Array<{
    __typename?: 'Operation';
    id: string;
    name: string;
    value: number;
    type: TransactionType;
    isPaid: boolean;
    paidAt?: string | null;
    createdAt: string;
    accountId: string;
    categoryId?: string | null;
    creditCardId?: string | null;
  }>;
  balance: { __typename?: 'CalcPreviousBalanceResult'; amount?: number | null };
};

export type UpdateOperationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  accountId: Scalars['String']['input'];
  type: TransactionType;
  value: Scalars['Float']['input'];
  isPaid: Scalars['Boolean']['input'];
  paidAt: Scalars['DateTime']['input'];
  creditCardId?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateOperationMutation = {
  __typename?: 'Mutation';
  updateOneOperation: {
    __typename?: 'Operation';
    id: string;
    name: string;
    value: number;
    type: TransactionType;
    accountId: string;
    categoryId?: string | null;
    isPaid: boolean;
    paidAt?: string | null;
    creditCardId?: string | null;
  };
};

export type DeleteOperationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteOperationMutation = {
  __typename?: 'Mutation';
  deleteOneOperation?: { __typename?: 'Operation'; id: string; name: string } | null;
};

export type RestoreOperationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RestoreOperationMutation = {
  __typename?: 'Mutation';
  restoreOneOperation?: { __typename?: 'Operation'; id: string; name: string } | null;
};

export type CreateOperationMutationVariables = Exact<{
  type: TransactionType;
  accountID: Scalars['String']['input'];
  paidAt: Scalars['DateTime']['input'];
}>;

export type CreateOperationMutation = {
  __typename?: 'Mutation';
  createOneOperation: { __typename?: 'Operation'; id: string; name: string };
};

export type UpdateUserMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  language?: InputMaybe<Locale>;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateOneUser: {
    __typename?: 'User';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    language: Locale;
  };
};

export type ChangeUserPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type ChangeUserPasswordMutation = {
  __typename?: 'Mutation';
  changeUserPassword?: string | null;
};
