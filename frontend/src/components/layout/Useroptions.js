import { React } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../actions/userAction";

const Useroptions = ({ show }) => {
  const { user } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/myorders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return show ? (
    <Useroption>
      <Userinfo>
        <UserImage src={user.avatar.url} alt="profileimg" />
        <Name>
          <i className="bx bxs-crown usercrown"></i> {user.name}
        </Name>
      </Userinfo>

      <Userlink>
        <Userbtn onClick={orders}>
          <i className="bx bxs-shopping-bag"></i>your orders
        </Userbtn>
        {user.role === "admin" ? (
          <Userbtn onClick={dashboard}>
            <i className="bx bxs-dashboard"></i>dashboard
          </Userbtn>
        ) : (
          ""
        )}
        <Userbtn onClick={account}>
          <i className="bx bxs-user-pin"></i>account
        </Userbtn>
        <Userbtn onClick={cart}>
          <i className="bx bxs-cart"></i>{" "}
          <span>{`cart ${cartitems.length}`}</span>
        </Userbtn>
        <Userbtn onClick={logoutUser}>
          <i className="bx bx-log-out"></i>logout
        </Userbtn>
      </Userlink>
    </Useroption>
  ) : (
    ""
  );
};

const Useroption = styled.div`
  position: absolute;
  right: 10px;
  top: 70px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  z-index: 1;
  transition: 0.3s;
`;

const Userinfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Name = styled.h3`
  word-break: break-word;
  width: 100px;
  color: #a5a5a5;
  word-break: break-all;
  font-size: 1rem;

  .usercrown {
    font-size: 15px;
    color: gold;
  }
`;
const UserImage = styled.img`
  border-radius: 50%;
  height: 50px;
  border: 3px solid gray;
  margin: 5px;
`;

const Userlink = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid gray;
`;
const Userbtn = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  margin: 5px;
  text-transform: capitalize;
  transition: 0.3s;

  &:hover {
    color: #ababab;
    transition: 0.3s;
  }

  span {
    margin: 0px 5px;
  }

  i {
    margin: 5px;
    color: #fff;
    font-size: 20px;
  }
`;
export default Useroptions;
