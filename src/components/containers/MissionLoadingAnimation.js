import React from "react";
import styled from "styled-components";

const MissionLoadingAnimation = ({ animation, handleOnEnded }) => {
  return (
    <MainContainer>
      <video width="100%" height="100%" autoPlay onEnded={handleOnEnded}>
        <source src={animation} />
        Your browser does not support the video tag.
      </video>
    </MainContainer>
  );
};

export default MissionLoadingAnimation;

const MainContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 80%;
  video {
    height: fit-content;
    @media (min-width: 1024px) {
      height: 100%;
    }
  }
`;
