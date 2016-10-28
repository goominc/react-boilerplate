export default (state = { bullet: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_BULLET':
      return Object.assign({}, state, { bullet: !state.bullet });
    case 'SELECT_BULLET':
      return Object.assign({}, state, { productIndex: action.productIndex });
    default:
      return state;
  }
};
