import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Footer from 'components/Footer';
import AddTodo from 'containers/AddTodo';
import VisibleTodoList from 'containers/VisibleTodoList';

const App = ({ auth }) => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    {auth && auth.email ?
      `Hi, ${auth.email}` :
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
  auth: PropTypes.object,
};

export default connect(
  state => ({ auth: state.auth })
)(App);
