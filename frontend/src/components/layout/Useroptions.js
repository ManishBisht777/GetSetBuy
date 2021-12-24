import { React } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const Useroptions = () => {
  const { user } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function orders() {
    navigate("/myorders");
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
      <button onClick={orders}>your orders</button>
      <button onClick={account}>account</button>
      <button onClick={cart}>{`cart${cartitems.length}`}</button>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};

export default Useroptions;
