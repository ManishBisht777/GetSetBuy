import React, { useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.css";
const Payment = () => {
  const orderinfo = JSON.parse(sessionStorage.getItem("orderinfo"));
  const payBtn = useRef(null);
  const submitHandler = () => {};
  return (
    <div>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h3>card info</h3>
          <div>
            <h3>yoyo</h3>
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <h3>yoyo</h3>
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <h3>yoyo</h3>
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderinfo && orderinfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </div>
  );
};

export default Payment;
