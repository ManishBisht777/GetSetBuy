import React from "react";
import Cartitemcard from "./Cartitemcard";
import { useSelector, useDispatch } from "react-redux";
import { addtocart, removefromcart } from "../../actions/cartaction";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);

  const incquantity = (id, quantity, stock) => {
    const newqty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addtocart(id, newqty));
  };
  const decquantity = (id, quantity) => {
    const newqty = quantity - 1;
    if (newqty === 0) {
      dispatch(removefromcart(id));
    } else {
      dispatch(addtocart(id, newqty));
    }
  };

  const deletecartitem = (id) => {
    dispatch(removefromcart(id));
  };

  const checkouthandler = () => {
    navigate("/auth?redirect=shipping");
  };
  return (
    <div>
      <h3>this is cart</h3>
      <p>product</p>
      <p>quantity</p>
      <p>subtotal</p>
      {cartitems &&
        cartitems.map((item) => (
          <div className="cart" key={item.product}>
            <Cartitemcard item={item} deleteitem={deletecartitem} />
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
          </div>
        ))}
      <p>full total</p>
      <p>
        {`${cartitems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )}`}
      </p>
      <button onClick={checkouthandler}>checkout</button>
    </div>
  );
};

export default Cart;