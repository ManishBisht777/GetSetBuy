import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const Card = ({ product }) => {
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <div className="product-img">
        <img src={product.images[0].url} alt="" />
      </div>
      <div className="product-card-info">
        <h2>{product.name}</h2>
        <div className="rating">
          <Rating {...options} />
          {/* <div className="noofreview">{product.noofrewiew} Reviews</div> */}
        </div>
        <p>{product.price}</p>
      </div>
      <i className="bx bx-cart addtocart"></i>
    </Link>
  );
};

export default Card;
