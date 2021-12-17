import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/Cartconstant";

export const cartreducer = (
  state = { cartitems: [], shippinginfo: {} },
  action
) => {
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

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartitems: state.cartitems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippinginfo: action.payload,
      };

    default:
      return state;
  }
};
