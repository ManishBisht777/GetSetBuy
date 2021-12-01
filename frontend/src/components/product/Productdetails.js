import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getproductdetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Productdetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );

  useEffect(() => {
    dispatch(getproductdetails(id));
  }, [dispatch, id, loading, error]);

  return (
    <div>
      <div>
        {product.images &&
          product.images.map((item, i) => {
            return <img key={i} src={item.url} alt="1" />;
          })}
      </div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.reviews}</p>
      <p>{product.noofreview} review</p>
    </div>
  );
};

export default Productdetails;
