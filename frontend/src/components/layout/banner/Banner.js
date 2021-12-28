import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <Bannerbox>
      <h3>product banner</h3>
    </Bannerbox>
  );
};

const Bannerbox = styled.div`
  width: 100%;
  height: 40vmax;
  background: yellow;
  display: flex;
  background-blend-mode: lighten;
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
`;

export default Banner;
