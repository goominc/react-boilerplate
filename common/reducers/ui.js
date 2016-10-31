export default (state = { bullet: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOWING_BULLETS':
      return Object.assign({}, state, { bullet: !state.bullet, productIndex: undefined });
    case 'TOGGLE_SELECTING_BULLET': {
      const productIndex = state.productIndex === action.productIndex ?
        undefined : action.productIndex;
      return Object.assign({}, state, { productIndex });
    }
    default:
      return state;
  }
};
