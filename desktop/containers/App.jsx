import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Footer from 'components/Footer';
import AddTodo from 'containers/AddTodo';
import VisibleTodoList from 'containers/VisibleTodoList';
import messages from 'common/i18n/messages';

const App = ({ auth, intl }) => (
  <div>
    <h1>{intl.formatMessage(messages.app.title)}</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    {auth && auth.email ? `Hi, ${auth.email}` :
    <div>
      <Link to="/auth/login">Login</Link><br />
      <Link to="/auth/signup">Signup</Link>
    </div>
    }
    <br />
    <Link to="/about">About</Link><br />
  </div>
);

App.propTypes = {
  auth: PropTypes.shape({
    email: PropTypes.string,
  }),
  intl: intlShape.isRequired,
};

export default connect(
  state => ({ auth: state.auth }),
)(injectIntl(App));
