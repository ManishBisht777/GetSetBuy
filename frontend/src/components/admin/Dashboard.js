import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { getproductadmin } from "../../actions/productAction";
import { getallorders } from "../../actions/orderaction";
import "chart.js/auto";
import { getalluser } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading: productloading, products } = useSelector(
    (state) => state.products
  );
  const { loading: orderloading, orders } = useSelector(
    (state) => state.allorders
  );
  const { loading, users } = useSelector((state) => state.allusers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getproductadmin());
    dispatch(getallorders());
    dispatch(getalluser());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      {loading && orderloading && productloading ? (
        <Loader />
      ) : (
        <div className="dashboardContainer">
          <Typography component="h3">Dashboard</Typography>

          <div className="dashboardSummary">
            <div className="summarybox1">
              <p>
                Total Amount <span>₹ {totalAmount}</span>
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <h3>
                  <i className="bx bxl-product-hunt"></i> Product
                </h3>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/allorders">
                <h3>
                  <i className="bx bxs-shopping-bag"></i> Orders
                </h3>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <h3>
                  <i className="bx bxs-user"></i> Users
                </h3>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
