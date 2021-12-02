import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/layout/home/Home";
import Productdetails from "./components/product/Productdetails";
import Products from "./components/product/Products";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Productdetails />} />
        <Route exact path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
