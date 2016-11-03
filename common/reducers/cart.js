export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_QUANTITY': {
      const { variantId, quantity } = action;
      const newItem = { id: variantId, quantity };
      if (state.variants && state.variants.length) {
        const variants = [...state.variants];
        const index = variants.findIndex(v => v.id === variantId);
        if (index !== -1) {
          variants.splice(index, 1, newItem);
        } else {
          variants.push(newItem);
        }
        return { variants };
      }
      return { variants: [newItem] };
    }
    default:
      return state;
  }
};
