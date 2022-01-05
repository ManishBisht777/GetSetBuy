import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./newproduct.css";
import { UPDATE_USER_RESET } from "../../constants/UserConstant";
import { updateuser, userdetails, clearerror } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const Updateuser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userdetails);

  const {
    loading: updateloading,
    error: updateerror,
    isupdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(userdetails(id));
    } else {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    if (updateerror) {
      alert.error(updateerror);
      dispatch(clearerror());
    }

    if (isupdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isupdated, updateerror, id, user]);

  const userupdatehandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateuser(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={userupdatehandler}
            >
              <h1>update user</h1>

              <div>
                <SpellcheckIcon />
                <input
                  type="name"
                  placeholder="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="email"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <AccountTreeIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Category</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateloading ? true : false || role === "" ? true : false
                }
              >
                update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Updateuser;
