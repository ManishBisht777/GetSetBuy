import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Card from "./Card";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productcount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getproduct());
  }, [dispatch, error, alert]);

  return (
    <div className="">
      {loading ? (
        "loading"
      ) : (
        <div className="product-container">
          <h3>Products</h3>
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
};

export default Products;
