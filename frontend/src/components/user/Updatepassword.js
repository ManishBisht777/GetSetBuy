import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, updatepassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/UserConstant";

const Updatepassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isupdated } = useSelector((state) => state.profile);

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const change = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("confirmpassword", confirmpassword);
    dispatch(updatepassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (isupdated) {
      alert.success("password updated succesfully");
      navigate("/");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [alert, error, dispatch, navigate, isupdated]);

  return (
    <div>
      <h3>update password</h3>
      <div className="sameform signupform">
        <form action="" onSubmit={change}>
          <h3>Signup</h3>
          <input
            // todo replace placeholder={ value} to value={ value}
            name="oldpassword"
            type="text"
            placeholder="oldpassword"
            onChange={(e) => setoldpassword(e.target.value)}
          />
          <input
            name="newpassword"
            type="text"
            placeholder="newpassword"
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <input
            name="confirmpassword"
            type="text"
            placeholder="confirmpassword"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />

          <input type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export default Updatepassword;
