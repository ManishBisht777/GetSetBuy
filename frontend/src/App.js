import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/layout/home/Home";
import Productdetails from "./components/product/Productdetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/user/LoginSignup";
// import store from "./store";
// import { useEffect } from "react";
// import { loaduser } from "./actions/userAction";
// import { useSelector } from "react-redux";
// import Useroptions from "./components/layout/Useroptions";

function App() {
  // const { isauthenticated, user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   store.dispatch(loaduser());
  // }, []);

  return (
    <Router>
      <Navbar />
      {
        // isauthenticated &&
        // <Useroptions />
      }
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Productdetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/auth" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
