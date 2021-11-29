import React from "react";
import "../css/Card.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import img from "../images/cd2.jpg";
import Product from "./Product";
import Reactstars from "react-rating-stars-component";
function Card({ product }) {
  const options = {
    edit: false,
    color: "black",
    activeColor: "gray",
    value: 3.5,
    isHalf: true,
  };
  return (
    <div class="product-card">
      <div class="product-img">
        <img src={product.images[0].url} alt="" />
      </div>
      <div class="product-card-info">
        <h2>{product.name}</h2>
        <div class="rating">
          <Reactstars {...options}></Reactstars>
        </div>
        <p>{product.price}</p>
      </div>
      <ion-icon class="addtocart" name="add-outline"></ion-icon>
    </div>
  );
}

export default Card;
