import React from 'react';

const Login = () => (
  <div className="login">
    <h1 className="login__title">withmoney</h1>
    <form className="login__form">
      <h3 className="login__subtitle">Log in</h3>
      <div className="field">
        <input type="text" className="field__input" />
      </div>
      <div className="field">
        <input type="password" className="field__input" />
      </div>
      <div className="field">
        <button type="submit" className="button">Log in</button>
      </div>
      <div className="login__footer">
        <span>Do not have an account?</span>
        <a href="#">Signup</a>
      </div>
    </form>
  </div>
);

export default Login;
