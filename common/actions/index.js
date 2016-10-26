import request from 'superagent';

export const getMain = () => (dispatch) => {
  dispatch({ type: 'REQUEST_MAIN' });
  request
    .get('/api/v1/main')
    .then(res => dispatch({
      type: 'MAIN',
      data: res.body,
    }));
};

export const toggleBullet = () => ({ type: 'TOGGLE_BULLET' });
