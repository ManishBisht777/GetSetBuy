import React from "react";
import "./loginsignup.css";

const LoginSignup = () => {
  return (
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
              <input type="text" placeholder="UserName" />
              <input type="password" placeholder="Password" />
              <input type="submit" type="submit" value="Login" />
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
