import * as Transactions from '../../api/Transactions';

const USER_SUCCESS = 'user/success';
const USER_REQUEST = 'user/request';
const USER_FAIL = 'user/fail';

const init = {
  data: [],
  isLoading: false,
  isError: false,
  error: {},
};

const onSuccess = ({ data }) => ({
  type: USER_SUCCESS,
  payload: {
    data,
    isLoading: false,
  },
});

const onFail = error => ({
  type: USER_FAIL,
  payload: {
    error,
    isLoading: false,
    isError: true,
  },
});

const onRequest = () => ({
  type: USER_REQUEST,
  payload: {
    isLoading: true,
    isError: false,
    error: {},
    data: [],
  },
});

export const list = () => (dispatch) => {
  dispatch(onRequest());

  return Transactions.list()
    .then(({ data }) => dispatch(onSuccess(data)))
    .catch(error => dispatch(onFail(error)));
};


export default (state = init, { type, payload }) => {
  switch (type) {
    case USER_SUCCESS:
      return payload;
    case USER_FAIL:
      return payload;
    case USER_REQUEST:
      return payload;
    default:
      return state;
  }
};
