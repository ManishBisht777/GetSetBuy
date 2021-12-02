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
      <p>{product.noofrewiew} review</p>

      <div>
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <p key={review._id}>{review.comment}</p>
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default Productdetails;