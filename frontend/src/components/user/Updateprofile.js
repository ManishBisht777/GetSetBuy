import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, loaduser, updateprofile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstant";

const Updateprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isupdated } = useSelector((state) => state.profile);
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
      dispatch(loaduser);
      navigate("/");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [alert, error, dispatch, navigate, user, isupdated]);

  return (
    <div>
      <h3>update profile</h3>
      <div className="sameform signupform">
        <form action="" onSubmit={updateprofileaction}>
          <h3>Signup</h3>
          <input
            name="name"
            type="text"
            placeholder={user.name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            name="email"
            type="text"
            placeholder={user.email}
            onChange={(e) => setname(e.target.value)}
          />
          <div className="avatar">
            <img src={preview} alt="" />
            <input
              name="avatar"
              accept="image/*"
              type="file"
              placeholder="avatar"
              onChange={updateProfileDataChange}
            />
          </div>
          <input type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
