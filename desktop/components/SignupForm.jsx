import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SignupForm = ({ doSignup }) => {
  const input = {};
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.email.value || !input.password.value) {
      window.alert('input email & password'); // eslint-disable-line no-alert
      return;
    }
    if (input.password.value !== input.passwordRe.value) {
      window.alert('password mismatch'); // eslint-disable-line no-alert
      return;
    }
    const data = {
      email: input.email.value,
      password: input.password.value,
    };
    doSignup(data);
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
      <input
        type="password"
        ref={node => (input.passwordRe = node)}
        placeholder="Retype Password"
      /><br />
      <button type="submit">Signup</button><br /><br />
      <Link to="/auth/login">Go Login</Link><br />
      <Link to="/">Go Home</Link>
    </form>
  );
};

SignupForm.propTypes = {
  doSignup: PropTypes.func,
};

export default SignupForm;
