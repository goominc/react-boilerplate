// Copyright (C) 2016 Goom Inc. All rights reserved.

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { login } from 'actions';
import LoginForm from 'components/LoginForm';

const mapDispatchToProps = dispatch => ({
  doLogin: (body) => {
    dispatch(login(body))
      .then(() => browserHistory.push('/'))
      .catch(); // error handled in action
  },
});
const Login = connect(
  undefined,
  mapDispatchToProps
)(LoginForm);

export default Login;
