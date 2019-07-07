import React from 'react';
import PropTypes from 'prop-types';
import TransactionsItem from 'components/TableTransactionItem';
import { TransactionListTypes, TransactionColumnsTypes } from 'app/types/transactions';
import Spin from 'components/Spin';

const TransactionsList = ({ list, columns, isLoading }) => {
  if (isLoading) {
    return (
      <div className="table-transactions__loading">
        <Spin />
      </div>
    );
  }
  if (!list.length) {
    return <div className="table-transactions__no-data">No Transaction on this month.</div>;
  }

  return list.map(item => <TransactionsItem key={item.id} transaction={item} columns={columns} />);
};

TransactionsList.propTypes = {
  list: TransactionListTypes,
  columns: TransactionColumnsTypes.isRequired,
  isLoading: PropTypes.bool,
};

TransactionsList.defaultProps = {
  list: [],
  isLoading: false,
};

export default TransactionsList;
