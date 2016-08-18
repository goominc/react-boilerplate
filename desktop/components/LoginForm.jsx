// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';

const LoginForm = ({ doLogin }) => {
  const input = {};
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.email.value || !input.password.value) {
      window.alert('input email & password');
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
        ref={node => {
          input.email = node;
        }}
        placeholder="Email"
      /><br />
      <input
        type="password"
        ref={node => {
          input.password = node;
        }}
        placeholder="Password"
      /><br />
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  doLogin: PropTypes.func,
};

export default LoginForm;
