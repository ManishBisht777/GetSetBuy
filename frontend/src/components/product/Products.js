import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Card from "./Card";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import "./product.css";

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
    dispatch(getproduct(keyword, currentpage, price, category));
  }, [dispatch, error, alert, keyword, currentpage, price, category]);

  let count = filterproductscount;

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

          <div className="filterBox">
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
            <fieldset>Rating Above</fieldset>
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
