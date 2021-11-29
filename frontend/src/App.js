import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar2 from "./components/Navbar2";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar2 />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
