import React from "react";
import Reactstars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ product }) => {
  const options = {
    edit: false,
    color: "gray",
    activeColor: "black",
    value: product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Link to={`/product/${product._id}`}>
      <Productcard>
        <Productimg className="product-img">
          <img src={product.images[0].url} alt="" />
        </Productimg>
        <div className="product-card-info">
          <h2>{product.name}</h2>
          <div className="rating">
            <Reactstars {...options}></Reactstars>
            <span>{product.noofrewiew}</span>
          </div>
          <p>{product.price}</p>
        </div>
        <ion-icon className="addtocart" name="add-outline"></ion-icon>
      </Productcard>
    </Link>
  );
};

const Productcard = styled.div`
  margin: 10px;
`;
const Productimg = styled.div`
  img {
    width: 250px;
  }
`;
export default Card;
