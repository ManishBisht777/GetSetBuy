import { React } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../actions/userAction";

const Useroptions = () => {
  const { user } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();
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

  return (
    <Useroption>
      <Userinfo>
        <UserImage src={user.avatar.url} alt="profileimg" />
        <Name>{user.name}</Name>
      </Userinfo>

      <Userlink>
        <Userbtn onClick={orders}>
          <i className="bx bxs-shopping-bag"></i>your orders
        </Userbtn>
        <Userbtn onClick={account}>
          <i className="bx bxs-user-pin"></i>account
        </Userbtn>
        <Userbtn onClick={cart}>
          <i className="bx bxs-cart"></i> {`cart${cartitems.length}`}
        </Userbtn>
        <Userbtn onClick={logoutUser}>
          <i className="bx bx-log-out"></i>logout
        </Userbtn>
      </Userlink>
    </Useroption>
  );
};

const Useroption = styled.div`
  position: absolute;
  right: 10px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 200px;
`;

const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h3`
  word-break: break-all;
`;
const UserImage = styled.img`
  border-radius: 12px;
  height: 100px;
`;

const Userlink = styled.div``;
const Userbtn = styled.button`
  padding: 5px 10px;
  background-color: rgba(17, 25, 40, 0.95);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  cursor: pointer;
  color: #fff;
  margin: 5px;

  i {
    margin: 5px;
  }
`;
export default Useroptions;
