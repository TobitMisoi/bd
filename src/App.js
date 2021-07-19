import React, { useContext } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LeftSection from "./components/LeftSect";
import RightSection from "./components/RightSect";
import { AuthContext } from "./contexts/AuthContext";

const Main = styled.div`
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  background: #9cecfb; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0052d4,
    #65c7f7,
    #9cecfb
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0052d4,
    #65c7f7,
    #9cecfb
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
`;

const MainClipped = styled(Main)`
  clip-path: polygon(0 0, 100% 0, 100% 83%, 0% 100%);
`;

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <Main>
          <Navbar />
          <Dashboard />
        </Main>
      ) : (
        <MainClipped>
          <Navbar />
          <LeftSection />
          <RightSection />
        </MainClipped>
      )}
    </>
  );
}

export default App;
