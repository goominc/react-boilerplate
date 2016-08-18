// Copyright (C) 2016 Goom Inc. All rights reserved.

export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    default:
      return state;
  }
};
