import React from "react";
import Reactstars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const options = {
    edit: false,
    color: "black",
    activeColor: "yellow",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <div className="product-img">
        <img src={product.images[0].url} alt="" />
      </div>
      <div className="product-card-info">
        <h2>{product.name}</h2>
        <div className="rating">
          <Reactstars {...options}></Reactstars>
          <div className="noofreview">{product.noofrewiew} Reviews</div>
        </div>
        <p>{product.price}</p>
      </div>
      <i className="bx bx-cart addtocart"></i>
    </Link>
  );
};

export default Card;
