import React, { useEffect } from "react";
import Card from "./Card";
import { getproduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./card.css";

function Product() {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { loading, error, products, productcount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getproduct());
  }, [dispatch, error, alert]);

  return (
    <div className="">
      {loading ? (
        "loading"
      ) : (
        <div className="product-container">
          <h3>Top Products</h3>
          <div className="products">
            {products &&
              products.map((product) => (
                <Card product={product} key={product._id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
