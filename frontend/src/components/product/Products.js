import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Card from "./Card";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import img from "../../images/banner1.jpg";

import "./product.css";
import Banner from "../layout/banner/Banner";
import Loader from "../layout/Loader/Loader";

const Products = () => {
  const categories = [
    "laptop",
    "footwear",
    "bottom",
    "tops",
    "attire",
    "camera",
    "smartPhones",
  ];

  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error,
    products,
    productCount,
    resultperpage,
    filterproductscount,
  } = useSelector((state) => state.products);

  const [currentpage, setcurrentpage] = useState(1);
  const [price, setprice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setratings] = useState(0);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentpage(e);
  };

  const priceHandler = (event, newprice) => {
    setprice(newprice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    dispatch(getproduct(keyword, currentpage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentpage, price, category, ratings]);

  let count = filterproductscount;

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div className="products-container">
          <div className="product-box">
            {/* <Imgslider /> */}
            <Banner bannerimg={img} />
            <div className="filterBox">
              <div className="filter-price">
                <h2>Price</h2>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                  dragging="MuiSlider-dragging"
                />
              </div>
              <div className="filter-category">
                <h2>category</h2>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-rating">
                <h3>Rating Above</h3>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setratings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>
            </div>

            <h3 className="product-heading">Products</h3>

            <div className="products">
              {filterproductscount ? (
                products &&
                products.map((product) => (
                  <Card product={product} key={product._id} />
                ))
              ) : (
                <div className="noproductfound">
                  <h3>No product found</h3>
                </div>
              )}
            </div>
          </div>

          {resultperpage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentpage}
                itemsCountPerPage={resultperpage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
