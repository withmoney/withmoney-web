import { OperationFieldsFragment, TransactionType } from 'graphql-service/types';

const sumOperation = (accumulateValue: number, currentValue: OperationFieldsFragment) => {
  return accumulateValue + currentValue.value;
};

const subOperation = (subtractValue: number, totalValue: OperationFieldsFragment) => {
  return subtractValue - totalValue.value;
};

export const getCalcOperationsByType = (
  operations: OperationFieldsFragment[],
  type: TransactionType,
) => {
  const operationFiltered = operations.filter((operation) => operation.type === type);
  const operationsPaidOut = operationFiltered.filter((operation) => operation.isPaid);
  const totalPaidOut = operationsPaidOut.reduce(sumOperation, 0);
  const total = operationFiltered.reduce(sumOperation, 0);

  return [totalPaidOut, total];
};

export const getTotalOperations = (operations: OperationFieldsFragment[]) => {
  const operationFiltered = operations.filter(
    (operation) => operation.type === TransactionType.Deposit,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalPaidExpenses = (operations: OperationFieldsFragment[]) => {
  const operationFiltered = operations.filter(
    (operation) =>
      (operation.type === TransactionType.FixedExpense ||
        operation.type === TransactionType.VariableExpense) &&
      operation.isPaid === true,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalPendingExpenses = (operations: OperationFieldsFragment[]) => {
  const operationFiltered = operations.filter(
    (operation) =>
      (operation.type === TransactionType.FixedExpense ||
        operation.type === TransactionType.VariableExpense) &&
      operation.isPaid === false,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalCreditCardExpenses = (operations: OperationFieldsFragment[]) => {
  const operationFiltered = operations.filter(
    (operation) => operation.type === TransactionType.CreditCard,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const PlannedBalance = (operations: OperationFieldsFragment[]) => {
  const allIncomes = operations.filter((operation) => operation.type === TransactionType.Deposit);
  const allExpenses = operations.filter((operation) => operation.type !== TransactionType.Deposit);
  const totalAllIncomes = allIncomes.reduce(sumOperation, 0);
  const total = allExpenses.reduce(subOperation, totalAllIncomes);
  return total;
};
