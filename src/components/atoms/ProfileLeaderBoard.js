import React from "react";
import styled from "styled-components";
import Frame from "../../assets/single-border-filled.png";
import SingleBorderFrame from "../containers/SingleBorderFrame";

const ProfileLeaderBoard = ({ img, onClick }) => {
  return (
    <Container onClick={() => onClick()}>
      <TabletHeader>Background</TabletHeader>
      <HeightContainer>
        <SingleBorderFrame height={"100%"} width={"100%"}>
          <MainContainer>
            <PositionContainer>
              <img src={img} alt=" " width={"100%"} />
            </PositionContainer>
          </MainContainer>
        </SingleBorderFrame>
      </HeightContainer>
    </Container>
  );
};

ProfileLeaderBoard.defaultProps = {
  position: "N/A",
};

export default ProfileLeaderBoard;

const Container = styled.div`
  cursor: pointer;
  h3 {
    height: 30px;
    font-size: 10px;
    text-wrap: wrap;
  }
  @media (min-width: 426px) {
    h3 {
      font-size: 1.17em;
    }
  }
`;

const HeightContainer = styled.div`
  height: 150px;
  @media (min-width: 769px) {
    height: 100px;
  }
`;

const TabletHeader = styled.h3`
  display: none;
  @media (min-width: 769px) {
    display: block;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PositionContainer = styled.div`
  display: flex;
  height: 70px;
  /* background-image: url(${Frame});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%; */
  p {
    margin: auto;
    font-size: 14px;
  }
  @media (min-width: 769px) {
    p {
      font-size: 20px;
    }
  }
`;
