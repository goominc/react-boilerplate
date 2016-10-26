export default (state = {}, action) => {
  switch (action.type) {
    case 'MAIN':
      return action.data;
    default:
      return state;
  }
};
