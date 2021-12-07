import { React } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const Useroptions = () => {
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <img src={user.avatar.url} alt="profileimg" />
      <button onClick={account}>account</button>
      <button onClick={orders}>your orders</button>
      <button onClick={cart}>cart</button>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};

export default Useroptions;
