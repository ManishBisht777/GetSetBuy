import React, { useEffect, useState } from "react";
import "./loginsignup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearerror, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet";

const LoginSignup = () => {
  <Helmet>
    <script src="./loginjs.js" type="text/javascript" />
  </Helmet>;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setavatar] = useState();
  const [preview, setpreview] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreview(reader.result);
          setavatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror);
    }
    if (isauthenticated) {
      navigate(redirect);
    }
  }, [alert, error, dispatch, navigate, isauthenticated, redirect]);

  const [toggle, settoggle] = useState(false);
  var class1 = "form";
  var class2 = "sameform signinform ";
  var class3 = "sameform signupform";
  if (toggle) {
    class1 += " active";
    class2 += " active2 ";
  }

  return loading ? (
    "loading"
  ) : (
    <div className="conatiner">
      <div className="box">
        <div className="same signin">
          <h2>Already Have An Account?</h2>
          <button
            onClick={() => settoggle(!toggle)}
            className="signinbtn"
            type="submit"
          >
            Signin
          </button>
        </div>
        <div className="same signup">
          <h2>Don't Have an Account ?</h2>
          <button
            onClick={() => settoggle(!toggle)}
            className="signupbtn"
            type="submit"
          >
            Signup
          </button>
        </div>
        <div className={class1}>
          <div className={class2}>
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
              <input type="submit" value="Login" onClick={loginsubmit} />
              <Link to="/password/forgot" className="forgot">
                Forgot Password?
              </Link>
            </form>
          </div>
          <div className={class3}>
            <form action="" onSubmit={registerSubmit}>
              <h3>Signup</h3>
              <input
                name="name"
                type="text"
                placeholder="UserName"
                onChange={registerDataChange}
              />
              <input
                name="email"
                type="text"
                placeholder="Email Id"
                onChange={registerDataChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={registerDataChange}
              />
              {/* <input
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
              /> */}
              <div className="avatar">
                <img src={preview} alt="" />
                <input
                  name="avatar"
                  accept="image/*"
                  type="file"
                  placeholder="avatar"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
