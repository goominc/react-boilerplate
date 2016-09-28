import request from 'superagent';

let nextTodoId = 0;

export const addTodo = (text) => {
  const ret = {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };
  nextTodoId += 1;
  return ret;
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

export const ping = () => (dispatch) => {
  dispatch({ type: 'PING' });
  request
    .get('/ping')
    .then(res => dispatch(addTodo(res.text)))
    .catch(error => dispatch({ type: 'PING_ERROR', error }));
};

const getLoginAction = res => (dispatch) => {
  dispatch({
    type: 'LOGIN',
    data: res.body,
  });
};

export const login = body => dispatch => (
  request
    .post('/api/v1/login')
    .send(body)
    .then(res => dispatch(getLoginAction(res)))
    .catch((error) => {
      window.alert(error.response.text); // eslint-disable-line no-alert
      throw error;
    })
);

export const signup = body => dispatch => (
  request
    .post('/api/v1/users')
    .send(body)
    .then(res => dispatch(getLoginAction(res)))
    .catch((error) => {
      window.alert(error.response.text); // eslint-disable-line no-alert
      throw error;
    })
);
