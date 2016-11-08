import { connect } from 'react-redux';

import { toggleTodo } from 'actions';
import TodoList from 'components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return [];
  }
};

export default connect(
  state => ({ todos: getVisibleTodos(state.todos, state.visibilityFilter) }),
  dispatch => ({ onTodoClick: id => dispatch(toggleTodo(id)) }),
)(TodoList);
