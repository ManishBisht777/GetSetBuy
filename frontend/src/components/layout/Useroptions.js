import { React, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "../../actions/userAction";

const Useroptions = () => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

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
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src="./cat3.png"
            // {user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Useroptions;
