export default (state = { bullet: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_BULLET':
      return Object.assign({}, state, { bullet: !state.bullet });
    default:
      return state;
  }
};
