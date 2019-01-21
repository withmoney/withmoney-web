/* eslint-disable import/prefer-default-export */

const logout = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  }
};

export const catchInvalidToken = fetch => fetch.catch((err) => {
  if (typeof err.response !== 'undefined') {
    if (err.response.data.message === 'Invalid auth token provided.') {
      logout();
    }
  }

  throw err;
});
