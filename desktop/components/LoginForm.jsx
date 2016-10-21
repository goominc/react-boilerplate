import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LoginForm = ({ doLogin }) => {
  const input = {};
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.email.value || !input.password.value) {
      window.alert('input email & password'); // eslint-disable-line no-alert
      return;
    }
    const data = {
      email: input.email.value,
      password: input.password.value,
    };
    doLogin(data);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        ref={node => (input.email = node)}
        placeholder="Email"
      /><br />
      <input
        type="password"
        ref={node => (input.password = node)}
        placeholder="Password"
      /><br />
      <button type="submit">Login</button><br /><br />
      <Link to="/auth/signup">Go Signup</Link><br />
      <Link to="/">Go Home</Link>
    </form>
  );
};

LoginForm.propTypes = {
  doLogin: PropTypes.func,
};

export default LoginForm;
