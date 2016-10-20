import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { login } from 'actions';
import LoginForm from 'components/LoginForm';

export default connect(
  undefined,
  dispatch => ({
    doLogin: (body) => {
      dispatch(login(body))
        .then(() => browserHistory.push('/'))
        .catch(); // error handled in action
    },
  })
)(LoginForm);
