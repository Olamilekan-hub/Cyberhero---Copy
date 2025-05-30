import React from "react";
import styled from "styled-components";

export default function HeroContainer({ image, children }) {
  // console.log(image);
  return <ContainerHero image={image}>{children}</ContainerHero>;
}

const ContainerHero = styled.div`
  background-image: ${({ image }) => image && `url(${String(image)})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
