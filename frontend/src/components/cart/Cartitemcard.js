import React from "react";
import { Link } from "react-router-dom";
const Cartitemcard = ({ item, deleteitem }) => {
  return (
    <div>
      <img src={item.image} alt="yoyo" />
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <button onClick={() => deleteitem(item.product)}>remove</button>
    </div>
  );
};

export default Cartitemcard;
