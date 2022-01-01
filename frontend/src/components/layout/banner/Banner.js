import React from "react";
import "./banner.css";
const Banner = ({ bannerimg }) => {
  return (
    <div className="bannerbox">
      <img src={bannerimg} alt="bannerimg" />
    </div>
  );
};

export default Banner;
