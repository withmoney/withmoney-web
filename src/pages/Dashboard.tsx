import React from 'react';

const logOut = () => {
  localStorage.removeItem('withmoney-token');
};

const Dashboard = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>You is authenticated</p>
      <a href="/" onClick={logOut}>
        Log out
      </a>
    </>
  );
};

export default Dashboard;
