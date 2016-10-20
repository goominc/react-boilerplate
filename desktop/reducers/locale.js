const locale = (state = 'ko', action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      return action.locale;
    default:
      return state;
  }
};

export default locale;
