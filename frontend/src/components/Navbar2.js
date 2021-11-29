import React from "react";
import "../css/Navbar2.css";

function Navbar2() {
  return (
    <nav>
      <div className="logo">logo</div>
      <div className="search">
        <input type="text" placeholder="Search Here" search />
        <box-icon name="search-alt"></box-icon>
      </div>
      <div className="user">
        <box-icon name="user-circle" type="solid"></box-icon>
      </div>
    </nav>
  );
}

export default Navbar2;
