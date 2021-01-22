import { TransactionType, Operation } from '../models';

export default function getBalance(operations: Operation[]): number {
  return operations.reduce((accumulateValue: number, currentValue) => {
    if (!currentValue.isPaid) return accumulateValue;

    if (currentValue.type === TransactionType.Deposit) {
      return accumulateValue + currentValue.value;
    } else {
      return accumulateValue - currentValue.value;
    }
  }, 0);
}
