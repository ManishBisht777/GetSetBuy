import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearerrors, myorders } from "../../actions/orderaction";
import { Link } from "react-router-dom";
import "./myorder.css";

const Myorders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myorders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerrors);
    }

    dispatch(myorders());
  }, [dispatch, alert, error]);

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
          ? "greenColor"
          : "redColor";
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
      flex: 0.2,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            view order
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderitems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <h3 id="myOrdersHeading">{user.name}'s Orders</h3>
        </div>
      )}
    </div>
  );
};

export default Myorders;
