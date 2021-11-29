import React from "react";
import "../css/Home.css";
import styled from "styled-components";
function Home() {
  return (
    <Container>
      <h3>home component</h3>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
`;

export default Home;
