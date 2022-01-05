import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "./productlist.css";
import { deleteuser, getalluser, clearerror } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { DELETE_USER_RESET } from "../../constants/UserConstant";

const Userlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, loading, users } = useSelector((state) => state.allusers);

  const {
    error: deleterrror,
    isdeleted,
    message,
  } = useSelector((state) => state.profile);

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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getalluser());
  }, [dispatch, alert, error, deleterrror, isdeleted, navigate, message]);

  const deleteUserHandler = (id) => {
    dispatch(deleteuser(id));
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
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(`${params.getValue(params.id, "id")}`)
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
