import { useTranslation } from 'react-i18next';
import Info from './Info';
import { InformationContainer } from './style/Information.style';
import { useOperations } from 'hooks/useOperations';
import { getCalcOperationsByType } from 'utils/calcOperations';
import { TransactionType } from 'graphql-service/types';

const Information = () => {
  const { data } = useOperations();
  const { t } = useTranslation('sidebar');

  const operations = data?.operations || [];

  const [totalPaidDeposit, totalDeposit] = getCalcOperationsByType(
    operations,
    TransactionType.Income,
  );
  // const [totalPaidCreditCard, totalCreditCard] = getCalcOperationsByType(
  //   operations,
  //   TransactionType.CreditCard,
  // );
  const [totalPaidFixedExpense, totalFixedExpense] = getCalcOperationsByType(
    operations,
    TransactionType.Expense,
  );
  // const [totalPaidVariableExpense, totalVariableExpense] = getCalcOperationsByType(
  //   operations,
  //   TransactionType.VariableExpense,
  // );

  return (
    <InformationContainer>
      <Info
        variation="Deposit"
        name={t('incomes')}
        current={totalPaidDeposit}
        desired={totalDeposit}
      />
      <Info
        variation="FixedExpense"
        name={t('expenses')}
        current={totalPaidFixedExpense}
        desired={totalFixedExpense}
      />
    </InformationContainer>
  );
};

export default Information;
