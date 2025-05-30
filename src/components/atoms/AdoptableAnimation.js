import React from "react";
import styled from "styled-components";

const AdoptableAnimation = ({ url }) => {
  return (
    <MainContainer>
      <video width="100%" height="100%" autoPlay loop>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </MainContainer>
  );
};

export default AdoptableAnimation;

const MainContainer = styled.div``;
