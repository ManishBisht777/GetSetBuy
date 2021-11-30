import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { getproduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

function Product() {
  const dispatch = useDispatch();

  const { loading, error, products, productcount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getproduct());
  }, [dispatch]);

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
