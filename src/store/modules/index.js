import { combineReducers } from 'redux';
import user from 'store/user';
import transactions from 'store/transactions';

export default combineReducers({
  user,
  transactions,
});
