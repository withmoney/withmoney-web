import { combineReducers } from 'redux';
import user from './user';
import transactions from './transactions';

export default combineReducers({
  user,
  transactions,
});
