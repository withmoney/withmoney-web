import React from 'react';
import TransactionsItem from 'components/TableTransactionItem';
import { TransactionListTypes } from 'app/types/transactions';

const TransactionsList = ({ list }) => {
  if (!list.length) {
    return null;
  }

  return list.map(item => <TransactionsItem key={item.id} transaction={item} />);
};

TransactionsList.propTypes = {
  list: TransactionListTypes,
};

TransactionsList.defaultProps = {
  list: [],
};

export default TransactionsList;
