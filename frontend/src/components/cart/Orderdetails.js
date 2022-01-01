import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearerrors, orderdetail } from "../../actions/orderaction";
import Loader from "../layout/Loader/Loader";
import "./orderdetails.css";

const Orderdetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderdetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }

    dispatch(orderdetail(id));
  }, [dispatch, alert, error, id]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <h3 className="orderid">Order #{order && order._id}</h3>
            <h3>Shipping Info</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{order.shippinginfo && order.shippinginfo.phoneNo}</span>
              </div>
              <div>
                <p>Address</p>
                <span>
                  {order.shippinginfo &&
                    `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pinCode}, ${order.shippinginfo.country}`}
                </span>
              </div>
            </div>
            <h3>Payment</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount</p>
                <span>{order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <h3>Order Status</h3>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <h3>Order Items </h3>
            <div className="orderDetailsCartItemsContainer">
              {order.orderitems &&
                order.orderitems.map((item) => (
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
      )}
    </div>
  );
};

export default Orderdetails;
