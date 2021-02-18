import React from 'react';
import Info from './Info';
import { InformationContainer } from './style/Information.style';
import { useOperations } from '../../../hooks/useOperations';
import { TransactionType } from '../../../models';
import { getCalcOperationsByType } from '../../../utils/calcOperations';

const Information = () => {
  const { data } = useOperations();

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
      <Info variation="Deposit" name="Incomes" current={totalPaidDeposit} desired={totalDeposit} />
      <Info
        variation="FixedExpense"
        name="Recurrent Expenses"
        current={totalPaidFixedExpense}
        desired={totalFixedExpense}
      />
      <Info
        variation="VariableExpense"
        name="Other Expenses"
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
