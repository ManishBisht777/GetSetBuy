import React from "react";
import { Link } from "react-router-dom";
const Cartitemcard = ({ item }) => {
  return (
    <div>
      <img src={item.image} alt="yoyo" />
      <Link to={`/products/${item.product}`}>{item.name}</Link>
    </div>
  );
};

export default Cartitemcard;
