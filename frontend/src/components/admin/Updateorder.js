import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearerrors,
  orderdetail,
  updateorder,
} from "../../actions/orderaction";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderconstant";

const Updateorder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderdetails);
  const { error: updaterrror, isupdated } = useSelector(
    (state) => state.updatedeleteorder
  );
  const [status, setstatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors());
    }
    if (updaterrror) {
      alert.error(updaterrror);
      dispatch(clearerrors());
    }

    if (isupdated) {
      alert.success("order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(orderdetail(id));
  }, [dispatch, alert, error, id, updaterrror, isupdated]);

  const processorderhandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateorder(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage">
              <div>
                <div className="confirmshippingArea">
                  <h3>Shipping Info</h3>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone</p>
                      <span>
                        {order.shippinginfo && order.shippinginfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address</p>
                      <span>
                        {order.shippinginfo &&
                          `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pinCode}, ${order.shippinginfo.country}`}
                      </span>
                    </div>
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
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
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
                <div className="confirmCartItems">
                  <h3>cart items</h3>
                  <div className="confirmCartItemsContainer">
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
              <div>
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={processorderhandler}
                >
                  <h1>update order status</h1>
                  <div>
                    <AccountTreeIcon />
                    <select
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Updateorder;
