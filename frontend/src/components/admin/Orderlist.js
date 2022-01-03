import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearerror } from "../../actions/productAction";
import {
  getallorders,
  updateorder,
  deleteorder,
} from "../../actions/orderaction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "./productlist.css";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstant";

const Orderlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allorders);
  const { error: deleterrror, isdeleted } = useSelector(
    (state) => state.updatedeleteorder
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    // if (deleterrror) {
    //   alert.error(deleterrror);
    //   dispatch(clearerror());
    // }
    // if (isdeleted) {
    //   alert.success("product deleted Successfully");
    //   navigate("/admin/dashboard");
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }
    dispatch(getallorders());
  }, [dispatch, alert, error, deleterrror, isdeleted, navigate]);

  const deleteProductHandler = (id) => {
    console.log(id);
    // dispatch(deleteproduct(id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300 },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColorfont"
          : "redColorfont";
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.4,
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
            <Link to={`/order/${params.getValue(params.id, "id")}`}>
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderitems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  );
};

export default Orderlist;
