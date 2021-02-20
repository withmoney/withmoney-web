import React from 'react';
import { useTranslation } from 'react-i18next';
import Info from './Info';
import { InformationContainer } from './style/Information.style';
import { useOperations } from 'hooks/useOperations';
import { TransactionType } from 'models';
import { getCalcOperationsByType } from 'utils/calcOperations';

const Information = () => {
  const { data } = useOperations();
  const { t } = useTranslation('sidebar');

  const operations = data?.operations || [];

  const [totalPaidDeposit, totalDeposit] = getCalcOperationsByType(
    operations,
    TransactionType.Deposit,
  );
  const [totalPaidCreditCard, totalCreditCard] = getCalcOperationsByType(
    operations,
    TransactionType.CreditCard,
  );
  const [totalPaidFixedExpense, totalFixedExpense] = getCalcOperationsByType(
    operations,
    TransactionType.FixedExpense,
  );
  const [totalPaidVariableExpense, totalVariableExpense] = getCalcOperationsByType(
    operations,
    TransactionType.VariableExpense,
  );

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
        name={t('recurrentExpenses')}
        current={totalPaidFixedExpense}
        desired={totalFixedExpense}
      />
      <Info
        variation="VariableExpense"
        name={t('otherExpenses')}
        current={totalPaidVariableExpense}
        desired={totalVariableExpense}
      />
      {/* <Info
        variation="CreditCard"
        name="Credit Card Expenses"
        current={totalPaidCreditCard}
        desired={totalCreditCard}
      /> */}
    </InformationContainer>
  );
};

export default Information;
