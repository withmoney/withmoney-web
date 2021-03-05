import { TransactionType, Category, Operation } from 'models';

type CategoriesFiltered = {
  value: number;
  name: string;
};

export function filterCategories(
  type: 'incomes' | 'expenses',
  categories: Category[] = [],
  operations: Operation[] = [],
) {
  let categoriesFiltered: CategoriesFiltered[] = [];

  // Filter operations by type | Incomes or Expanses
  const filteredOperations = operations.filter((operation) =>
    type === 'incomes'
      ? operation.type === TransactionType.Deposit
      : operation.type !== TransactionType.Deposit,
  );

  // Filter operations that no has category
  const noCategory = filteredOperations.filter((operation) => {
    return operation.categoryId === null && operation.value;
  });

  if (noCategory?.length) {
    const value = noCategory.reduce(sumOperation, 0);
    if (value > 0) categoriesFiltered.push({ value: value, name: 'no Category' });
  }

  // filter operation by category
  categories.map((category) => {
    const allOperations = filteredOperations.filter((operation) => {
      if (operation.categoryId === category.id) {
        return operation;
      }
    });

    const value = allOperations.reduce(sumOperation, 0);
    if (value > 0) categoriesFiltered.push({ value: value, name: category.name });
  });

  return categoriesFiltered.sort(sortCategories);
}

const sumOperation = (accumulateValue: number, currentValue: Operation) => {
  return accumulateValue + currentValue.value;
};

const sortCategories = (categoryA: CategoriesFiltered, categoryB: CategoriesFiltered) => {
  if (categoryA.value >= categoryB.value) return -1;
  if (categoryB.value >= categoryA.value) return 1;
  return 0;
};
