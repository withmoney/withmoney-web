import React from 'react';
import PropTypes from 'prop-types';

const TransactionsItem = ({ transaction }) => (
  <div className="table-transactions__row">
    <div className="table-transactions__col">{transaction.transactionDate}</div>
    <div className="table-transactions__col">{transaction.name}</div>
    <div className="table-transactions__col">{transaction.CategoryId}</div>
    <div className="table-transactions__col">{transaction.value}</div>
    <div className="table-transactions__col">
      <input type="checkbox" />
    </div>
  </div>
);

TransactionsItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    transactionDate: PropTypes.string,
    name: PropTypes.string,
    CategoryId: PropTypes.number,
    value: PropTypes.string,
  }).isRequired,
};

export default TransactionsItem;
