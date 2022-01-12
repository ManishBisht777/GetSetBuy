import React from "react";
import Cartitemcard from "./Cartitemcard";
import { useSelector, useDispatch } from "react-redux";
import { addtocart, removefromcart } from "../../actions/cartaction";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

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
      {cartitems.length === 0 ? (
        <div className="emptycart">
          <h3>no item in cart</h3>

          <iframe title="EmptyCart" src="https://gifer.com/embed/5rt"></iframe>

          <Link to={"/products"}>Shop Now</Link>
        </div>
      ) : (
        <div className="table-section">
          <div className="table-header">
            <p>product</p>
            <p>quantity</p>
            <p>subtotal</p>
          </div>

          {cartitems &&
            cartitems.map((item) => (
              <div className="cart" key={item.product}>
                <Cartitemcard item={item} deleteitem={deletecartitem} />
                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      decquantity(item.product, item.quantity, item.stock)
                    }
                  >
                    <i className="bx bx-minus"></i>
                  </button>
                  <input type="number" readOnly value={item.quantity} />
                  <button
                    onClick={() =>
                      incquantity(item.product, item.quantity, item.stock)
                    }
                  >
                    <i className="bx bx-plus"></i>
                  </button>
                </div>
                <p className="subtotal">
                  <i class="bx bxs-dollar-circle"></i>
                  {item.price * item.quantity}
                </p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartitems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div className="checkOutBtn">
              <button onClick={checkouthandler}>
                <i class="bx bxs-badge-check"></i>Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
