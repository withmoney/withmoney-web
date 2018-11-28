import React from 'react';

const TableTransactions = () => (
  <div className="table-transactions">
    <div className="table-transactions__tabs">
      <div className="tab-in-out">
        <button type="button" className="tab-in-out__tab tab-in-out__tab--in-actived">In</button>
        <button type="button" className="tab-in-out__tab">Out</button>
      </div>
      <div className="tab-months">
        <button type="button" className="tab-months__navigation">October 18</button>
        <span className="tab-months__current">November 18</span>
        <button type="button" className="tab-months__navigation">December 18</button>
      </div>
    </div>
    <div className="table-transactions__header">
      header
    </div>
    <div className="table-transactions__footer">
      footer
    </div>
  </div>
);

export default TableTransactions;
