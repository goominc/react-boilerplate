import React from 'react';
import { Link } from 'react-router';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Link to="/about">About</Link>
  </div>
);

export default App;
