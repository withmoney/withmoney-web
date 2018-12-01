import localStorage from 'localStorage';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    return true;
  }

  return false;
};

export default checkAuth;
