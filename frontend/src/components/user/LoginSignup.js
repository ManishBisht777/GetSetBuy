import React, { useEffect, useState } from "react";
import "./loginsignup.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearerror } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignup = () => {
  const dispatch = useDispatch();

  const { error, loading, isauthenticated } = useSelector(
    (state) => state.user
  );

  const alert = useAlert();
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const loginsubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginemail, loginpassword));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (isauthenticated) {
      navigate("/account");
    }
  }, [alert, error, clearerror, dispatch, navigate, isauthenticated]);

  return loading ? (
    "loading"
  ) : (
    <div className="conatiner">
      <div className="box">
        <div className="same signin">
          <h2>Already Have An Account?</h2>
          <button className="signinbtn" type="submit">
            Signin
          </button>
        </div>
        <div className="same signup">
          <h2>Don't Have an Account ?</h2>
          <button className="signupbtn" type="submit">
            Signup
          </button>
        </div>
        <div className="form">
          <div className="sameform signinform">
            <form action="">
              <h3>SignIn</h3>
              <input
                type="text"
                placeholder="UserName"
                onChange={(e) => setloginemail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setloginpassword(e.target.value)}
              />
              <input
                type="submit"
                type="submit"
                value="Login"
                onClick={loginsubmit}
              />
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </form>
          </div>
          <div className="sameform signupform">
            <form action="">
              <h3>Signup</h3>
              <input type="text" placeholder="UserName" />
              <input type="text" placeholder="Email Id" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <input type="submit" type="submit" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
