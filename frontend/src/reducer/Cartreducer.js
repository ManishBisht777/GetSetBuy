import { ADD_TO_CART } from "../constants/Cartconstant";

export const cartreducer = (state = { cartitems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isitemexist = state.cartitems.find(
        (i) => i.product === item.product
      );

      if (isitemexist) {
        return {
          ...state,
          cartitems: state.cartitems.map((i) =>
            i.product === item.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartitems: [...state.cartitems, item],
        };
      }

    default:
      return state;
  }
};
