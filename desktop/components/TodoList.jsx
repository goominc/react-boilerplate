import PropTypes from 'prop-types';
import React from 'react';

import Todo from 'components/Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos && todos.map(todo => (
      <Todo
        key={todo.id}
        tabIndex={todo.id}
        onClick={() => onTodoClick(todo.id)}
        {...todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    completed: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
    text: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
