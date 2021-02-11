import { TransactionType, Operation } from '../models';

const sumOperation = (accumulateValue: number, currentValue: Operation) => {
  return accumulateValue + currentValue.value;
};

const subOperation = (subtractValue: number, totalValue: Operation) => {
  return subtractValue - totalValue.value;
};

export const getCalcOperationsByType = (operations: Operation[], type: TransactionType) => {
  const operationFiltered = operations.filter((operation) => operation.type === type);
  const operationsPaidOut = operationFiltered.filter((operation) => operation.isPaid);
  const totalPaidOut = operationsPaidOut.reduce(sumOperation, 0);
  const total = operationFiltered.reduce(sumOperation, 0);

  return [totalPaidOut, total];
};

export const getTotalOperations = (operations: Operation[]) => {
  const operationFiltered = operations.filter(
    (operation) => operation.type === TransactionType.Deposit,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalPaidExpenses = (operations: Operation[]) => {
  const operationFiltered = operations.filter(
    (operation) =>
      (operation.type === TransactionType.FixedExpense ||
        operation.type === TransactionType.VariableExpense) &&
      operation.isPaid === true,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalPendingExpenses = (operations: Operation[]) => {
  const operationFiltered = operations.filter(
    (operation) =>
      (operation.type === TransactionType.FixedExpense ||
        operation.type === TransactionType.VariableExpense) &&
      operation.isPaid === false,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const getTotalCreditCardExpenses = (operations: Operation[]) => {
  const operationFiltered = operations.filter(
    (operation) => operation.type === TransactionType.CreditCard,
  );
  const total = operationFiltered.reduce(sumOperation, 0);
  return total;
};

export const PlannedBalance = (operations: Operation[]) => {
  const allIncomes = operations.filter((operation) => operation.type === TransactionType.Deposit);
  const allExpenses = operations.filter((operation) => operation.type !== TransactionType.Deposit);
  const totalAllIncomes = allIncomes.reduce(sumOperation, 0);
  const total = allExpenses.reduce(subOperation, totalAllIncomes);
  return total;
};
