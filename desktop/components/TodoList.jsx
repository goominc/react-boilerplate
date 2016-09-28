import React, { PropTypes } from 'react';

import Todo from 'components/Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos && todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
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
