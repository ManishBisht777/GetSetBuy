import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, loaduser, updateprofile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstant";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import Loader from "../layout/Loader/Loader";
import "./updateprofile.css";

const Updateprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { loading, error, isupdated } = useSelector((state) => state.profile);
  const alert = useAlert();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState();
  const [preview, setpreview] = useState("");

  const updateprofileaction = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateprofile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setpreview(reader.result);
        setavatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setname(user.name);
      setemail(user.email);
      setpreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (isupdated) {
      alert.success("profile updated succesfully");
      navigate("/");
      dispatch(loaduser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [alert, error, dispatch, navigate, user, isupdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title="Update Profile" /> */}
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateprofileaction}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={preview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Updateprofile;
