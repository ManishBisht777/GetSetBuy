import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="foot">
          <div className="foot1">
            <h1>Category</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="foot2">
            <h1>Message Us</h1>
            {/* <div className="text"> </div> */}
            <form action="/">
              <div className="fields">
                <div className="field name">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="field email">
                  <input type="email" placeholder="Email" required />
                </div>
              </div>
              <div className="field">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="field">
                <input type="text" placeholder="Message" required />
              </div>
              <button type="submit">Send message</button>
            </form>
          </div>
        </div>
        <div className="foot3">
          <h1>Social as</h1>
          <ul className="as">
            <li>
              <a href="/">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="/">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a href="/">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ManishBisht777"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          </ul>
        </div>

        <span>
          Created With{" "}
          <span>
            <i className="bx bxs-heart"></i>
          </span>{" "}
          <a href="https://github.com/ManishBisht777">Manish Bisht </a>
        </span>
      </footer>
    </>
  );
}

export default Footer;
