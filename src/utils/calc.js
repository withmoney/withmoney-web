import { compose } from 'redux';
import money from 'app/utils/money';

const filterBy = (key, expect) => data => data.filter(item => item[key] === expect);

const lens = key => data => data.map(item => item[key]);

const apply = fn => data => data.map(item => fn(item));

const sum = data => data.reduce((acc, cur) => acc + cur, 0);

const sumAll = compose(
  money.floatToString,
  sum,
  apply(parseFloat),
  lens('value'),
);

const sumAllInTransactions = compose(
  sumAll,
  filterBy('type', 'in'),
);

const sumAllOutTransactions = compose(
  sumAll,
  filterBy('type', 'out'),
);

export default {
  sumAllInTransactions,
  sumAllOutTransactions,
  sumAllTransactions: sumAll,
};
