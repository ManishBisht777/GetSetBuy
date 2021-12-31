import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Checkoutsteps from "./Checkoutsteps";
import "./confirmorder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { shippinginfo, cartitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartitems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippinginfo.address}, ${shippinginfo.city}, ${shippinginfo.state}, ${shippinginfo.pinCode}, ${shippinginfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderinfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <div className="confirmOrderPage">
        <div>
          <Checkoutsteps activesteps={1} />
          <div className="confirmshippingArea">
            <h3>Shipping Info</h3>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{shippinginfo.phoneNo}</span>
              </div>
              <div>
                <p>Address</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h3>cart items</h3>
            <div className="confirmCartItemsContainer">
              {cartitems &&
                cartitems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <h3>order summary</h3>
            <div>
              <div>
                <p>Subtotal</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
