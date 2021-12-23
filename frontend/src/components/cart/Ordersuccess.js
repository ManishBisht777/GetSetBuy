import React from "react";
import { Link } from "react-router-dom";

const Ordersuccess = () => {
  return (
    <div>
      <h3>Order success</h3>
      <Link to="/myorder">view order</Link>
    </div>
  );
};

export default Ordersuccess;
