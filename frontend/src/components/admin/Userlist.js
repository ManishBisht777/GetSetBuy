import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearerror,
  getproductadmin,
  deleteproduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "./productlist.css";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstant";
import { getalluser } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const Userlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, loading, users } = useSelector((state) => state.allusers);
  const { error: deleterrror, isdeleted } = useSelector(
    (state) => state.updatedeleteproduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    if (deleterrror) {
      alert.error(deleterrror);
      dispatch(clearerror());
    }
    if (isdeleted) {
      alert.success("product deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getalluser());
  }, [dispatch, alert, error, deleterrror, isdeleted, navigate]);

  const deleteProductHandler = (id) => {
    console.log(id);
    dispatch(deleteproduct(id));
  };

  const columns = [
    { field: "id", headerName: "user ID", minWidth: 150, flex: 0.8 },

    {
      field: "email",
      headerName: "email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(`${params.getValue(params.id, "id")}`)
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 id="productListHeading">ALL PRODUCTS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Userlist;
