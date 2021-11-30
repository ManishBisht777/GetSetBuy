import React from "react";
import styled from "styled-components";
import Card from "./Card";

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
  return (
    <Wrap>
      <h3>products</h3>
      <Productcontainer>
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
        <Card product={product} />
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
