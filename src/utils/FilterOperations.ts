import { TransactionType, Category, Operation } from 'models';
import { useOperations } from 'hooks/useOperations';
import { useCategories } from 'hooks/useCategories';

const sumOperation = (accumulateValue: number, currentValue: Operation) => {
  return accumulateValue + currentValue.value;
};

const sortOperations = (a: CategoriesFiltered, b: CategoriesFiltered) => {
  if (a.value >= b.value) {
    return -1;
  }
  if (b.value >= a.value) {
    return 1;
  }
  return 0;
};

type CategoriesFiltered = {
  value: number;
  name: string;
};

export function filterCategories(incomes: boolean) {
  let categoriesFiltered: CategoriesFiltered[] = [{ value: 0, name: 'no Category' }];
  const { data: categories } = useCategories();
  const { data: operations } = useOperations();

  // filter Category
  categories?.categories.data &&
    operations?.operations &&
    categories.categories.data.map((category: Category) => {
      if (
        incomes
          ? category.type === TransactionType.Deposit
          : category.type !== TransactionType.Deposit
      ) {
        const operationFiltered = operations.operations.filter((operation) => {
          if (operation.categoryId === category.id) {
            return operation;
          }
        });
        const value = operationFiltered.reduce(sumOperation, 0);
        value > 0 && categoriesFiltered.push({ value: value, name: category.name });
      }
    });

  // filter noCategory
  operations?.operations.filter((operation) => {
    if (
      incomes
        ? operation.type === TransactionType.Deposit
        : operation.type !== TransactionType.Deposit
    )
      operation.categoryId === null && (categoriesFiltered[0].value += operation.value);
  });

  return categoriesFiltered.sort(sortOperations);
}
