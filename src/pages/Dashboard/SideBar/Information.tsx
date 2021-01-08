import React from 'react';
import Info from './Info';
import { InformationContainer } from './style/Information.style';
import { useOperations } from '../../../hooks/useOperations';
import { TransactionType } from '../../../models';
import filterOperations from '../../../utils/filterOperations';
import getCalcOperationsByType from '../../../utils/getCalcOperationsByType';

const Information = () => {
  const { data } = useOperations();

  const operations = data?.me?.operations || [];

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
        current={totalPaidCreditCard}
        desired={totalCreditCard}
      />
      <Info
        variation="credit"
        name="Credit"
        current={totalPaidFixedExpense}
        desired={totalFixedExpense}
      />
      <Info
        variation="unforessen"
        name="Unforessen"
        current={totalPaidVariableExpense}
        desired={totalVariableExpense}
      />
    </InformationContainer>
  );
};

export default Information;
