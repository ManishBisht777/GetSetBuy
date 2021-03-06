import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/layout/home/Home";
import Productdetails from "./components/product/Productdetails";
import Products from "./components/product/Products";
import LoginSignup from "./components/user/LoginSignup";
import store from "./store";
import { useEffect, useState } from "react";
import { loaduser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Useroptions from "./components/layout/Useroptions";
import Account from "./components/user/Account";
import Updateprofile from "./components/user/Updateprofile";
import Updatepassword from "./components/user/Updatepassword";
import Forgotpassword from "./components/user/Forgotpassword";
import Resetpassword from "./components/user/Resetpassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/cart/Payment";
import { loadStripe } from "@stripe/stripe-js";
import Ordersuccess from "./components/cart/Ordersuccess";
import Myorders from "./components/order/Myorders";
import Orderdetails from "./components/cart/Orderdetails";
import Dashboard from "./components/admin/Dashboard";
import Productlist from "./components/admin/Productlist";
import Newproduct from "./components/admin/Newproduct";
import Updateproduct from "./components/admin/Updateproduct";
import Orderlist from "./components/admin/Orderlist";
import Updateorder from "./components/admin/Updateorder";
import Userlist from "./components/admin/Userlist";
import Updateuser from "./components/admin/Updateuser";
import Productreviews from "./components/admin/Productreviews";
import About from "./components/about/About";
// import Notfound from "./components/layout/Notfound";
// deploy
axios.defaults.baseURL = "https://getsetbuy.herokuapp.com/";

axios.defaults.withCredentials = true;

// import ProtectedRoute from "./components/route/Protectedroute";

function App() {
  const { isauthenticated, user } = useSelector((state) => state.user);

  const [stripeapikey, setstripeapikey] = useState("");

  const getstripepaikey = async () => {
    const { data } = await axios.get("/api/stripeapikey");
    setstripeapikey(data.stripeapikey);
  };

  useEffect(() => {
    store.dispatch(loaduser());
    getstripepaikey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <div className="bigbox">
        <div className="Box1">
          <Navbar />
          {isauthenticated && <Useroptions user={user} />}
          {stripeapikey && (
            <Elements stripe={loadStripe(stripeapikey)}>
              <Routes>
                <Route exact path="/process/payment" element={<Payment />} />
              </Routes>
            </Elements>
          )}
        </div>
        <div className="box2">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />

            <Route exact path="/product/:id" element={<Productdetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:keyword" element={<Products />} />
            <Route exact path="/auth" element={<LoginSignup />} />
            <Route exact path="/account" element={<Account />} />
            {/* <ProtectedRoute exact path="/account" element={<Account />} /> */}
            <Route exact path="/me/update" element={<Updateprofile />} />
            <Route exact path="/password/update" element={<Updatepassword />} />
            <Route exact path="/password/forgot" element={<Forgotpassword />} />
            <Route exact path="/password/forgot" element={<Forgotpassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<Resetpassword />}
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/auth/shipping" element={<Shipping />} />
            <Route exact path="/success" element={<Ordersuccess />} />
            <Route exact path="/myorders" element={<Myorders />} />

            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/order/:id" element={<Orderdetails />} />

            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/products" element={<Productlist />} />
            <Route exact path="/admin/product" element={<Newproduct />} />
            <Route
              exact
              path="/admin/product/:id"
              element={<Updateproduct />}
            />
            <Route exact path="/allorders" element={<Orderlist />} />
            <Route exact path="/admin/order/:id" element={<Updateorder />} />
            <Route exact path="/admin/users" element={<Userlist />} />
            <Route exact path="/admin/user/:id" element={<Updateuser />} />
            <Route exact path="/reviews" element={<Productreviews />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
