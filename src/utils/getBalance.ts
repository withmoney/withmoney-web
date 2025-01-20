import { OperationFieldsFragment, TransactionType } from 'graphql-service/types';

export default function getBalance(operations: OperationFieldsFragment[]): number {
  return operations.reduce((accumulateValue: number, currentValue) => {
    if (!currentValue.isPaid) return accumulateValue;

    if (currentValue.type === TransactionType.Deposit) {
      return accumulateValue + currentValue.value;
    } else {
      return accumulateValue - currentValue.value;
    }
  }, 0);
}
