import React from "react";
import styled from "styled-components";
import mapPNG from "../../assets/worldmap-min.png";

export default function WorldMap() {
  return <MainContainer />;
}

const MainContainer = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${mapPNG});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 1;

  margin: 30px 0;

  @media (min-width: 600px) {
    height: 400px;
  }
  @media (min-width: 800px) {
    height: 600px;
  }
  @media (min-width: 1200px) {
    height: 800px;
  }
`;
