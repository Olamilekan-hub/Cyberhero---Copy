import React from "react";
import styled from "styled-components";
import buttonBackground from "../../assets/button-blue.svg";

export default function Button({
  text,
  handleOnClick,
  height,
  width,
  textSize,
}) {
  return (
    <MainContainer
      onClick={handleOnClick}
      height={height}
      width={width}
      textSize={textSize}
    >
      <p>{text}</p>
    </MainContainer>
  );
}

Button.defaultProps = {
  text: "No text",
  handleOnClick: () => console.log("Clicked a button without functionality"),
};

const MainContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  min-width: 100px;
  margin: 5px auto;
  background-image: url(${buttonBackground});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  width: ${({ width }) => (width ? `${width / 2}px` : "150px")};
  height: ${({ height }) => (height ? `${height / 2}px` : "35px")};
    &:hover {
    cursor: pointer;
  }

  p {
    font-size: ${({ textSize }) => (textSize ? `${textSize / 2}px` : "18px")};
  }

  @media (min-width: 426px) {
    width: ${({ width }) => (width ? `${width / 1.5}px` : "150px")};
    height: ${({ height }) => (height ? `${height / 1.5}px` : "35px")};
    p {
        font-size: ${({ textSize }) =>
          textSize ? `${textSize / 1.5}px` : "18px"};
     }
  }
  @media (min-width: 769px) {
    width: ${({ width }) => (width ? `${width / 1.3}px` : "150px")};
    height: ${({ height }) => (height ? `${height / 1.3}px` : "35px")};
    p {
        font-size: ${({ textSize }) =>
          textSize ? `${textSize / 1.5}px` : "18px"};
     }
  }
  @media (min-width: 1025px) {
    width: ${({ width }) => (width ? `${width}px` : "150px")};
    height: ${({ height }) => (height ? `${height}px` : "35px")};
    p {
        font-size: ${({ textSize }) => (textSize ? `${textSize}px` : "18px")};
     }
  }

`;
