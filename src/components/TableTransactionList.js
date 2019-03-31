import React from 'react';
import PropTypes from 'prop-types';
import TransactionsItem from './TableTransactionItem';

const TransactionsList = ({ list }) => {
  if (!list.length) {
    return null;
  }

  return list.map(item => <TransactionsItem key={item.id} transaction={item} />);
};

TransactionsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      transactionDate: PropTypes.string,
      name: PropTypes.string,
      CategoryId: PropTypes.number,
      value: PropTypes.string,
    }),
  ),
};

TransactionsList.defaultProps = {
  list: [],
};

export default TransactionsList;
