const SET_USER = 'user/set';
const CLEAN_USER = 'user/clean';

const init = {};

export const setUser = payload => ({
  type: SET_USER,
  payload,
});

export const cleanUser = () => ({
  type: CLEAN_USER,
});

export default (state = init, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload;
    case CLEAN_USER:
      return {};
    default:
      return state;
  }
};
