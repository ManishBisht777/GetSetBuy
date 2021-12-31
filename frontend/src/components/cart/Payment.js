import React, { useRef, useEffect } from "react";
import Checkoutsteps from "./Checkoutsteps";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import axios from "axios";
import { createorder, clearerrors } from "../../actions/orderaction";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const Payment = () => {
  const orderinfo = JSON.parse(sessionStorage.getItem("orderinfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartitems, shippinginfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.neworder);

  const paymentData = {
    amount: Math.round(orderinfo.totalPrice * 100),
  };

  console.log(shippinginfo);
  const order = {
    shippinginfo,
    orderitems: cartitems,
    itemsPrice: orderinfo.subtotal,
    taxPrice: orderinfo.tax,
    shippingPrice: orderinfo.shippingCharges,
    totalPrice: orderinfo.totalPrice,
  };

  console.log(order);

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippinginfo.address,
              city: shippinginfo.city,
              state: shippinginfo.state,
              postal_code: shippinginfo.pinCode,
              country: shippinginfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(order);

          dispatch(createorder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }
  }, [error, dispatch, alert]);
  return (
    <div>
      <Checkoutsteps activeSteps={2} />
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
