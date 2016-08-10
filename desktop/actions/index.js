import request from 'superagent';

let nextTodoId = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const ping = () => (dispatch) => {
  dispatch({ type: 'PING' });
  request
    .get('/ping')
    .then((res) => dispatch(addTodo(res.text)))
    .catch((error) => dispatch({ type: 'PING_ERROR', error }));
};
