import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Useroptions from "../Useroptions";

function Navbar() {
  const [profile, setprofile] = useState(false);
  const { isauthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  return (
    <Nav>
      <div className="logo">Company</div>
      <div className="links">
        <ul>
          <li>
            <a href="/">
              {/* <i className="bx bxs-home-heart"></i> */}
              Home
            </a>
          </li>
          <li>
            <a href="/">
              {/* <i className="bx bxs-book-add"></i> */}
              About
            </a>
          </li>
          <li>
            <Link to={"/products"}>
              {/* <i className="bx bxs-shopping-bags"></i> */}
              products
            </Link>
          </li>
          <li>
            <Link to={"/cart"}>
              {/* <i className="bx bxs-cart"></i> */}
              Cart
            </Link>
          </li>
          <li>
            <Link to={"/cart"}>
              {/* <i className="bx bxs-cart"></i> */}
              Cart
            </Link>
          </li>
        </ul>
      </div>
      <Searchbar className="search">
        <i className="bx bx-search-alt"></i>
        <input type="text" placeholder="Search Here" />
      </Searchbar>

      {isauthenticated ? (
        <Useroption onClick={() => setprofile(!profile)}>
          <img
            className=" userprofileicon bx bxs-user-circle"
            src={user.avatar.url}
            alt="profileimage"
          />
          <Useroptions show={profile} />
        </Useroption>
      ) : (
        <Link to={"/auth"}>
          <Loginbutton> login</Loginbutton>
        </Link>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  height: 70px;
  /* background: rgb(61, 66, 82); */
  /* background: url("./bgnav.jpg"); */
  background-size: cover;
  background-position: center;
  position: fixed;
  background-color: #161824;
  background-blend-mode: luminosity;
  width: 100%;
  top: 0;
  font-family: "Roboto", sans-serif;
  z-index: 1;
  box-shadow: 1px 2px 20px 8px #1f222e;
  .logo {
    font-family: "Comforter", cursive;
    font-size: 2rem;
    color: #fff;
    letter-spacing: 1.5px;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0 10px;
    font-size: 15px;
    transition: 0.3s;
    border-radius: 5px;
    transition: 0.3s;
    padding: 1px 5px;

    &:hover {
      background: #ffffff17;
      transition: 0.3s;
    }

    i {
      font-size: 25px;
      margin: 5px;
    }
  }
  a {
    text-decoration: none;
    padding: 5px;
    color: #ababab;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    transition: 0.3s;
    letter-spacing: 1px;
  }

  i {
    color: #fff;
    font-size: 30px;
  }

  .links ul {
    display: flex;
    align-items: center;
  }
  .userprofileicon {
    border: 2px solid gray;
    border-radius: 50%;
  }
`;

const Loginbutton = styled.button`
  border: none;
  background: purple;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  background: #1f222e;
  border-radius: 5px;
  padding: 10px;
  width: 250px;
  i {
    font-size: 20px;
    color: #ababab;
  }
  input {
    margin: 0 10px;
    border-radius: 5px;
    border: none;
    background: transparent;
    width: 90px;
    color: #ababab;

    &::placeholder {
      color: #ababab;
    }
    &:focus {
      outline: none;
    }
  }
`;

const Useroption = styled.div`
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
`;
export default Navbar;
