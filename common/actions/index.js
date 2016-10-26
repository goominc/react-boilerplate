import request from 'superagent';

export const getMain = () => (dispatch) => { // eslint-disable-line
  dispatch({ type: 'REQUEST_MAIN' });
  request
    .get('/api/v1/main')
    .then(res => dispatch({
      type: 'MAIN',
      data: res.body,
    }));
};
