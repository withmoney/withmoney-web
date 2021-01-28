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
      <Info
        variation="entrance"
        name="Entrance"
        current={totalPaidDeposit}
        desired={totalDeposit}
      />
      <Info
        variation="recurrent"
        name="Recurrent"
        current={totalPaidFixedExpense}
        desired={totalFixedExpense}
      />
      <Info
        variation="credit"
        name="Credit"
        current={totalPaidCreditCard}
        desired={totalCreditCard}
      />
      <Info
        variation="unforeseen"
        name="Unforeseen"
        current={totalPaidVariableExpense}
        desired={totalVariableExpense}
      />
    </InformationContainer>
  );
};

export default Information;
