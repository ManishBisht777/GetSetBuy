import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, resetpassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Resetpassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, success } = useSelector((state) => state.forgotpassword);

  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const change = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", newpassword);
    myForm.set("confirmpassword", confirmpassword);
    dispatch(resetpassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (success) {
      alert.success("password reset succesfully");
      navigate("/auth");
    }
  }, [alert, error, dispatch, navigate, success]);
  return (
    <div>
      <h3>reset password</h3>
      <div className="sameform signupform">
        <form action="" onSubmit={change}>
          <h3>Signup</h3>

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

export default Resetpassword;
