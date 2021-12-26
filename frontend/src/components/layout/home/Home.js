import React from "react";
import styled from "styled-components";
import Product from "../../product/Product";
import Imgslider from "../Imgslider";
import MetaData from "../MetaData";
const Home = () => {
  return (
    <Wrap>
      <MetaData title="Ecommerce" />
      <Imgslider />
      <Container>
        <h3>hello</h3>
      </Container>
      <Product />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  &:before {
    background: url("./home-background.png") center center / cover no-repeat
      fixed;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const Container = styled.section`
  min-height: 50vh;
  width: 100%;
`;
export default Home;
