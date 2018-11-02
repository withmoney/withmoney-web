import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default compose(
  composeWithDevTools,
  applyMiddleware,
)(thunk);
