import React from "react";
import styled from "styled-components";
import Product from "../../product/Product";
import MetaData from "../MetaData";
function Home() {
  return (
    <Wrap>
      <MetaData title="Ecommerce" />
      <Container>
        <h3>hello</h3>
      </Container>
      <Product />
    </Wrap>
  );
}

const Wrap = styled.div``;

const Container = styled.section`
  min-height: 50vh;
  width: 100%;
  background: grey;
`;
export default Home;
