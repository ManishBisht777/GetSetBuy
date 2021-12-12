import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearerror, forgotpassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.forgotpassword);

  const [email, setemail] = useState("");

  const change = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotpassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (message) {
      alert.success(message);
    }
  }, [alert, error, dispatch, message, navigate]);

  return (
    <div>
      <h3>forgot password</h3>
      <div>
        <form action="" onSubmit={change}>
          <input
            // todo replace placeholder={ value} to value={ value}
            name="email"
            type="text"
            placeholder="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <input type="submit" value="email" />
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
