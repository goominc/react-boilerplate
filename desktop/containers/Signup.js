import { connect } from 'react-redux';

import { signup } from 'actions';
import SignupForm from 'components/SignupForm';

export default connect(
  undefined,
  dispatch => ({ doSignup: body => dispatch(signup(body)) }),
)(SignupForm);
