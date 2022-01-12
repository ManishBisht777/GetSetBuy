import React from "react";
import "./category.css";

const Category = () => {
  return (
    <div className="category-container">
      {/* <h3>Have A look</h3> */}
      <div className="categories">
        <div className="category-card">
          <div className="category-card-info">
            <h2>North India</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam,
              omnis? Atque dignissimos.
            </p>
            <button className="view-now">Visit Now</button>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card-info">
            <h2>East India</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam,
              omnis? Atque dignissimos.
            </p>
            <button className="view-now">Shop Now</button>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card-info">
            <h2>Fitness</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam,
              omnis? Atque dignissimos.
            </p>
            <button className="view-now">Shop Now</button>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card-info">
            <h2>Clothing</h2>
            <p>
              Explore your true style. We promise comfort. High Style
              Exceptional Service.
            </p>
            <button className="view-now">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
