import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { signup } from 'actions';
import SignupForm from 'components/SignupForm';

export default connect(
  undefined,
  dispatch => ({
    doSignup: (body) => {
      dispatch(signup(body))
        .then(() => browserHistory.push('/'))
        .catch(); // error handled in action
    },
  })
)(SignupForm);
