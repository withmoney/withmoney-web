import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classname from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ButtonRounded from './ButtonRounded';
import * as TransactionsActions from '../store/modules/transactions';
import TransactionsList from './TableTransactionList';

const ButtonNavigation = ({ onClick, direction, month }) => (
  <button type="button" className="tab-months__navigation" onClick={onClick(direction)}>
    {month.format('MMMM YY')}
  </button>
);

ButtonNavigation.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  month: PropTypes.any.isRequired,
};

class TableTransactions extends React.Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
    this.onNavigate = this.onNavigate.bind(this);

    const currentMoment = moment.tz('UTC');

    this.state = {
      type: 'in',
      currentMonth: currentMoment,
      previousMonth: currentMoment.clone().subtract(1, 'month'),
      nextMonth: currentMoment.clone().add(1, 'month'),
    };
  }

  componentDidMount() {
    this.getTransactions();
  }

  onNavigate(direction) {
    return () => {
      const { currentMonth } = this.state;
      let newState;

      if (direction === 'next') {
        newState = {
          previousMonth: currentMonth,
          currentMonth: currentMonth.clone().add(1, 'month'),
          nextMonth: currentMonth.clone().add(2, 'month'),
        };
      } else {
        newState = {
          previousMonth: currentMonth.clone().subtract(2, 'month'),
          currentMonth: currentMonth.clone().subtract(1, 'month'),
          nextMonth: currentMonth,
        };
      }

      this.setState(newState, this.getTransactions);
    };
  }

  async getTransactions() {
    const { actions } = this.props;
    const { type, currentMonth } = this.state;

    const start = moment(currentMonth)
      .startOf('month')
      .toISOString();
    const end = moment(currentMonth)
      .endOf('month')
      .toISOString();

    const query = {
      batch: 'Categories',
      order: 'transactionDate.asc',
      type,
      transactionDate: [start, end].join(','),
    };

    await actions.transactions.list(query);
  }

  changeTab(typeTab, type) {
    this.setState(
      {
        [typeTab]: type,
      },
      this.getTransactions,
    );
  }

  render() {
    const { type, currentMonth, nextMonth, previousMonth } = this.state;
    const { transactions } = this.props;

    return (
      <div className="table-transactions">
        <div className="table-transactions__tabs">
          <div className="tab-in-out">
            <button
              type="button"
              id="tab-in"
              className={classname('tab-in-out__tab', {
                'tab-in-out__tab--in-actived': type === 'in',
              })}
              onClick={() => this.changeTab('type', 'in')}
            >
              In
            </button>
            <button
              type="button"
              id="tab-out"
              className={classname('tab-in-out__tab', {
                'tab-in-out__tab--out-actived': type === 'out',
              })}
              onClick={() => this.changeTab('type', 'out')}
            >
              Out
            </button>
          </div>
          <div className="tab-months">
            <ButtonNavigation
              onClick={this.onNavigate}
              direction="previous"
              month={previousMonth}
            />
            <span className="tab-months__current">{currentMonth.format('MMMM YY')}</span>
            <ButtonNavigation onClick={this.onNavigate} direction="next" month={nextMonth} />
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
          <TransactionsList list={transactions.data} />
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
  }
}

TableTransactions.propTypes = {
  actions: PropTypes.shape({
    transactions: PropTypes.shape({
      list: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        transactionDate: PropTypes.string,
        name: PropTypes.string,
        CategoryId: PropTypes.number,
        value: PropTypes.string,
      }),
    ),
  }),
};

TableTransactions.defaultProps = {
  transactions: {
    data: [],
  },
};

const mapDispatchToProps = dispatch => ({
  actions: {
    transactions: bindActionCreators(TransactionsActions, dispatch),
  },
});

const mapStateToProps = ({ transactions }) => ({ transactions });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableTransactions);
