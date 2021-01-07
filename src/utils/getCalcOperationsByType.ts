import { TransactionType, Operation } from '../models';

const sumOperation = (accumulateValue: number, currentValue: Operation) => {
  return accumulateValue + currentValue.value;
};

const getCalcOperationsByType = (operations: Operation[], type: TransactionType) => {
  const operationFiltered = operations.filter((operation) => operation.type === type);
  const operationsPaidOut = operationFiltered.filter((operation) => operation.isPaid);
  const totalPaidOut = operationsPaidOut.reduce(sumOperation, 0);
  const total = operationFiltered.reduce(sumOperation, 0);

  return [totalPaidOut, total];
};

export default getCalcOperationsByType;
