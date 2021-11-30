import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { getproduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

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
  }, [dispatch, error]);

  return (
    <div className="">
      {loading ? (
        "loading"
      ) : (
        <Wrap>
          <h3>products</h3>
          <Productcontainer>
            {products &&
              products.map((product) => (
                <Card product={product} key={product._id} />
              ))}
          </Productcontainer>
        </Wrap>
      )}
    </div>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Productcontainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default Product;
