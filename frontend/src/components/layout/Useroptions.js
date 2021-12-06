import { React, useState } from "react";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "../../actions/userAction";

const Useroptions = ({ user }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  function orders() {
    Navigate("/orders");
  }
  function account() {
    Navigate("/account");
  }
  function cart() {
    Navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout);
    alert.success("Logout Successfully");
  }

  return (
    <div>
      <h3>{user.name}</h3>
    </div>
  );
};

export default Useroptions;
