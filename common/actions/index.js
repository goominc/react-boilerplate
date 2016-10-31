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

export const toggleShowingBullets = () => ({ type: 'TOGGLE_SHOWING_BULLETS' });
export const toggleSelectingBullet = productIndex => ({
  type: 'TOGGLE_SELECTING_BULLET',
  productIndex,
});
