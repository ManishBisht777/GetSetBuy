import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Useroptions from "../Useroptions";

function Navbar() {
  const [profile, setprofile] = useState(false);
  return (
    <Nav>
      <div className="logo">Company</div>
      <div className="links">
        <ul>
          <li>
            <i className="bx bx-home"></i>
            <a href="/">Home</a>
          </li>
          <li>
            <i className="bx bx-book"></i>
            <a href="/">About</a>
          </li>
          <li>
            <i className=" bx bx-archive-in"></i>
            <Link to={"/myorders"}>Your Order</Link>
          </li>
          <li>
            <i className="bx bx-cart-alt"></i>
            <Link to={"/cart"}>Cart</Link>
          </li>
        </ul>
      </div>
      <div className="search">
        <input type="text" placeholder="Search Here" />
        <i className="bx bx-search-alt"></i>
      </div>

      <i
        onClick={() => setprofile(!profile)}
        className=" userprofileicon bx bxs-user-circle"
      ></i>

      <Useroptions show={profile} />
    </Nav>
  );
}

const Nav = styled.nav`

  display: flex;
  justify-content: space-between;
  padding:10px;
  align-items: center;
  background: rgb(61,66,82);
  font-family: "Roboto", sans-serif;
  position: relative;
  z-index:1;
  .logo {
    font-family: "Comforter", cursive;
    font-size: 2rem;
    color: #fff;
    letter-spacing: 1.5px;
  }

  li
  {
      list-style:none;
      display:flex;
      align-items:center;
      margin:0 10px;
      i{
          font-size:20px;
      }
  }
  a{
      text-decoration:none;
      margin:0 5px;
    padding:5px;
      color:#fff;
  }

  .search {
    display: flex;
    align-items: center;

    input {
      margin: 0 10px;
      padding:5px 10px;
      border-radius:5px;
      border:1px solid white;
      background:transparent;
    }
  }

  i {
    color: #fff;
    font-size: 30px;
  }

  .links ul{
      display:flex;
      align-items:center;
  }
  .userprofileicon
  {
    border:5px solid gray;
    border-radius:50%;
  }
  }
`;
export default Navbar;
