import React from "react";
import { Link } from "react-router-dom";
import "./carditemcard.css";

const Cartitemcard = ({ item, deleteitem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <button onClick={() => deleteitem(item.product)}>
          <i class="bx bxs-trash-alt"></i>Remove
        </button>
      </div>
    </div>
  );
};

export default Cartitemcard;
