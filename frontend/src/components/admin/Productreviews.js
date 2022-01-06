import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearerror,
  getallreviews,
  deletereview,
} from "../../actions/productAction";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "./productlist.css";
import { DELETE_REVIEW_RESET } from "../../constants/ProductConstant";

const Productreviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productid, setproductid] = useState("");

  const alert = useAlert();
  const { error, reviews, loading } = useSelector(
    (state) => state.productreview
  );

  const { error: deleterrror, isdeleted } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (productid.length === 24) {
      dispatch(getallreviews(productid));
    }
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    if (deleterrror) {
      alert.error(deleterrror);
      dispatch(clearerror());
    }
    if (isdeleted) {
      alert.success("Review deleted Successfully");
      navigate("/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleterrror, isdeleted, navigate, productid]);

  const deleteReviewHandler = (reviewid) => {
    console.log(productid);
    dispatch(deletereview(reviewid, productid));
  };

  const getreviewshandler = (e) => {
    e.preventDefault();

    dispatch(getallreviews(productid));
  };

  const columns = [
    { field: "id", headerName: "review ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "comment",
      type: "number",
      flex: 0.3,
    },

    {
      field: "rating",
      headerName: "rating",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColorfont"
          : "redColorfont";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(`${params.getValue(params.id, "id")}`)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={getreviewshandler}
        >
          <h1>All reviews</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="productid"
              placeholder="productid"
              required
              value={productid}
              onChange={(e) => setproductid(e.target.value)}
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || productid === "" ? true : false}
          >
            serach
          </Button>
        </form>
        {reviews && reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        ) : (
          <div className="noreview">
            <h3>no review found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productreviews;
