import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Useroptions from "../Useroptions";

function Navbar() {
  const [profile, setprofile] = useState(false);
  const { isauthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");

  const [navopen, setnavopen] = useState(false);

  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Nav>
      <div className="logo">GetsetBuy</div>
      <div className="togglenavbtn">
        <i
          className="bx bx-menu"
          onClick={() => {
            setnavopen(!navopen);
          }}
        ></i>
        {navopen ? (
          <>
            <ul>
              <div className="logonav">GetsetBuy</div>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to={"/products"}>products</Link>
              </li>
              <li>
                <Link to={"/cart"}>Cart</Link>
              </li>
              {/* <li>
                <Link to={"/cart"}>Cart</Link>
              </li> */}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to={"/products"}>products</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>
          {/* <li>
            <Link to={"/cart"}>Cart</Link>
          </li> */}
        </ul>
      </div>
      <Searchbar className="search">
        <i className="bx bx-search-alt" onClick={searchSubmitHandler}></i>
        <input
          type="text"
          placeholder="Search Here"
          onChange={(e) => setKeyword(e.target.value)}
        />
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
  z-index: 100000;
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
  .logo {
    font-family: "Comforter", cursive;
    font-size: 2rem;
    color: #fff;
    letter-spacing: 1.5px;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .togglenavbtn {
    display: none;
    position: absolute;
    left: 20px;
    top: 20px;

    .logonav {
      font-family: "Comforter", cursive;
      font-size: 2rem;
      color: #fff;
      letter-spacing: 1.5px;
    }

    ul {
      background: #13161ead;
      border: 1px solid #80808094;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 25px;
    }

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;
    }
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

    @media (max-width: 900px) {
      display: none;
    }

    /* @media (max-width: 900px) {
      flex-direction: column;
      position: absolute;
      left: 0px;
      top: 80px;
      background: #000000c2;
      padding: 20px;
      border: 1px solid #ffffff47;
      border-radius: 10px;
    } */
  }
  .userprofileicon {
    border: 2px solid gray;
    border-radius: 50%;

    @media (max-width: 900px) {
      margin-left: 10px;
    }
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

  @media (max-width: 900px) {
    margin-left: 50px;
  }
  i {
    font-size: 20px;
    color: #ababab;
    cursor: pointer;
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
