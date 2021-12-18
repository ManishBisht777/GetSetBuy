import React from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Payment = () => {
  const orderinfo = JSON.parse(sessionStorage.getItem("orderinfo"));
  return (
    <div>
      <div className="paymentContainer">
        <form
          className="paymentForm"
          // onSubmit={(e) => submitHandler(e)}
        >
          <h3>card info</h3>
          <div>
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            // value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </div>
  );
};

export default Payment;
