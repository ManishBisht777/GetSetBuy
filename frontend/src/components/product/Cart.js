import React from "react";
import Cartitemcard from "./Cartitemcard";
import { useSelector, useDispatch } from "react-redux";
import { addtocart } from "../../actions/cartaction";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);

  const incquantity = (id, quantity, stock) => {
    const newqty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addtocart(id, newqty));
  };
  const decquantity = (id, quantity) => {
    const newqty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addtocart(id, newqty));
  };
  return (
    <div>
      <h3>this is cart</h3>
      <p>product</p>
      <p>quantity</p>
      <p>subtotal</p>
      {cartitems &&
        cartitems.map((item) => (
          <>
            <Cartitemcard item={item} />
            <button
              onClick={() =>
                decquantity(item.product, item.quantity, item.stock)
              }
            >
              -
            </button>
            <input type="number" readOnly value={item.quantity} />
            <button
              onClick={() =>
                incquantity(item.product, item.quantity, item.stock)
              }
            >
              +
            </button>
            <p className="subtotal">{item.price * item.quantity}</p>
          </>
        ))}
    </div>
  );
};

export default Cart;
