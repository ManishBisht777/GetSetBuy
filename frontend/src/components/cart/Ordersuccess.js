import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./ordersuccess.css";

const Ordersuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <h3>Order success</h3>
      <Link to="/myorders">view order</Link>
    </div>
  );
};

export default Ordersuccess;
