import React from "react";
import loader from "../../../images/loading.gif";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loading" />
    </div>
  );
};

export default Loader;
