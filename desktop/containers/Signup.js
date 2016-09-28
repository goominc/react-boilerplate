// Copyright (C) 2016 Goom Inc. All rights reserved.

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { signup } from 'actions';
import SignupForm from 'components/SignupForm';

const mapDispatchToProps = dispatch => ({
  doSignup: (body) => {
    dispatch(signup(body))
      .then(() => browserHistory.push('/'))
      .catch(); // error handled in action
  },
});
const Signup = connect(
  undefined,
  mapDispatchToProps
)(SignupForm);

export default Signup;
