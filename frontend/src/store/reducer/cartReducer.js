import { ADD_TO_CART,EMPTY_CART,REMOVE_TO_CART,SAVE_ADDRESS } from "../../constant/constant";

export const cartReducer = (state= {cartItems:[],shippingAddress:{}},action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isPresent = state.cartItems.find(
        (it) => it.product === item.product
      );
      if (isPresent) {
        return {
          ...state,
          cartItems: state.cartItems.map((it) =>
            it.product === isPresent.product ? item : it
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems:[]
      }
    case SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
