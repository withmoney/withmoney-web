import React from 'react';
import { TransactionListTypes } from 'app/types/transactions';
import calc from 'app/utils/calc';

const TableTransactionsFooter = ({ transactions }) => {
  if (!transactions.length) {
    return null;
  }

  return (
    <div className="table-transactions__footer">
      <div className="table-transactions__labels">
        <div className="table-transactions__label">All Outs</div>
        <div className="table-transactions__label">All In</div>
        <div className="table-transactions__label">Total</div>
      </div>
      <div className="table-transactions__values">
        <div className="table-transactions__value">{calc.sumAllInTransactions(transactions)}</div>
        <div className="table-transactions__value">{calc.sumAllOutTransactions(transactions)}</div>
        <div className="table-transactions__value">{calc.sumAllTransactions(transactions)}</div>
      </div>
    </div>
  );
};

TableTransactionsFooter.propTypes = {
  transactions: TransactionListTypes,
};

TableTransactionsFooter.defaultProps = {
  transactions: [],
};

export default TableTransactionsFooter;
