import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { getproduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const product = {
  name: "white shirt",
  images: [
    {
      url: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/4F39B7E16726ECF419DD7C49E011DD95099AA20A962B0B10AA1881A70661CE45/scale?width=1440&aspectRatio=1.78&format=jpeg",
    },
  ],
  price: 1234,
  id: "12345678",
};

function Product() {
  const dispatch = useDispatch();

  const { loading, error, products, productcount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getproduct());
  }, [dispatch]);

  return (
    <Wrap>
      <h3>products</h3>
      <Productcontainer>
        {products && products.map((product) => <Card product={product} />)}
      </Productcontainer>
    </Wrap>
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
