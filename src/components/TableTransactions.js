import React from 'react';
import ButtonRounded from './ButtonRounded';

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
      <div className="table-transactions__header-col">Date</div>
      <div className="table-transactions__header-col">Name</div>
      <div className="table-transactions__header-col">Category</div>
      <div className="table-transactions__header-col">Value</div>
      <div className="table-transactions__header-col">Is Paid?</div>
    </div>
    <div className="table-transactions__body">
      <div className="table-transactions__row">
        <div className="table-transactions__col">08/11</div>
        <div className="table-transactions__col">Transaction Name</div>
        <div className="table-transactions__col">Category Name</div>
        <div className="table-transactions__col">$ 5,000.00</div>
        <div className="table-transactions__col">
          <input type="checkbox" />
        </div>
      </div>
      <div className="table-transactions__row">
        <div className="table-transactions__col">08/11</div>
        <div className="table-transactions__col">Transaction Name</div>
        <div className="table-transactions__col">Category Name</div>
        <div className="table-transactions__col">$ 5,000.00</div>
        <div className="table-transactions__col">
          <input type="checkbox" />
        </div>
      </div>
      <div className="table-transactions__row">
        <div className="table-transactions__col">08/11</div>
        <div className="table-transactions__col">Transaction Name</div>
        <div className="table-transactions__col">Category Name</div>
        <div className="table-transactions__col">$ 5,000.00</div>
        <div className="table-transactions__col">
          <input type="checkbox" />
        </div>
      </div>
      <div className="table-transactions__action">
        <ButtonRounded>Add Transaction</ButtonRounded>
      </div>
    </div>
    <div className="table-transactions__footer">
      <div className="table-transactions__labels">
        <div className="table-transactions__label">All Outs</div>
        <div className="table-transactions__label">All In</div>
        <div className="table-transactions__label">Total</div>
      </div>
      <div className="table-transactions__values">
        <div className="table-transactions__value">$ 5,000.12</div>
        <div className="table-transactions__value">$ 5,000.12</div>
        <div className="table-transactions__value">$ 5,000.12</div>
      </div>
    </div>
  </div>
);

export default TableTransactions;
