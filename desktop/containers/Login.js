import { connect } from 'react-redux';

import { login } from 'actions';
import LoginForm from 'components/LoginForm';

export default connect(
  undefined,
  dispatch => ({ doLogin: body => dispatch(login(body)) }),
)(LoginForm);
