import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Card from "./Card";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import "./product.css";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productCount, resultperpage } = useSelector(
    (state) => state.products
  );

  console.log(productCount);
  const [currentpage, setcurrentpage] = useState(1);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentpage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    dispatch(getproduct(keyword, currentpage));
  }, [dispatch, error, alert, keyword, currentpage]);

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
          {resultperpage < productCount && (
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
