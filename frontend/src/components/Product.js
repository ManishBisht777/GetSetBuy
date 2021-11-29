import React from "react";
import Card from "./Card";
import "../css/Product.css";

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
    <div className="product-container">
      <h3>Featured Products</h3>
      <div class="products">
        <Card product={product} />
      </div>
    </div>
  );
}

export default Product;
