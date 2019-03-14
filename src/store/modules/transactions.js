import * as Transactions from '../../api/Transactions';

const TRANSACTION_SUCCESS = 'transaction/success';
const TRANSACTION_SUCCESS_PUT = 'transaction/success_put';
const TRANSACTION_REQUEST = 'transaction/request';
const TRANSACTION_FAIL = 'transaction/fail';

const init = {
  isLoading: false,
  isError: false,
  message: '',
  data: [],
};

const onSuccess = ({ data }) => ({
  type: TRANSACTION_SUCCESS,
  payload: {
    data,
    isLoading: false,
  },
});

const onSuccessPut = (id, { data }) => ({
  type: TRANSACTION_SUCCESS_PUT,
  payload: {
    id,
    data,
  },
});

const onFail = ({ id, message, method }) => ({
  type: TRANSACTION_FAIL,
  payload: {
    id,
    message,
    method,
  },
});

const onRequest = (payload = {}) => ({ type: TRANSACTION_REQUEST, payload });

export const list = query => (dispatch) => {
  dispatch(onRequest());

  return Transactions.list(query)
    .then(({ data }) => dispatch(onSuccess(data)))
    .catch(error => dispatch(onFail(error)));
};

export const put = data => (dispatch) => {
  dispatch(onRequest(data));

  return Transactions.put(data.id, data)
    .then(response => dispatch(onSuccessPut(data.id, response)))
    .catch(error => dispatch(onFail({ id: data.id, message: error.message, method: 'put' })));
};


export default (state = init, { type, payload }) => {
  switch (type) {
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
      };
    case TRANSACTION_SUCCESS_PUT:
      return {
        ...state,
        isLoading: false,
        data: state.data.map(item => (
          item.id === payload.id ? ({ ...item, isEditing: false, ...payload.data }) : item
        )),
      };
    case TRANSACTION_FAIL:
      if (typeof payload.id !== 'undefined' && payload.method === 'put') {
        return {
          ...state,
          isError: true,
          isLoading: false,
          message: payload.message,
          data: state.data.map(item => (
            item.id === payload.id ? ({ ...item, isEditing: false }) : item
          )),
        };
      }
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: payload.message,
      };
    case TRANSACTION_REQUEST:
      if (typeof payload.id !== 'undefined') {
        return {
          ...state,
          isLoading: true,
          data: state.data.map(item => (
            item.id === payload.id ? ({ ...item, isEditing: true }) : item
          )),
        };
      }
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
