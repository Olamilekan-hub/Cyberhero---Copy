import React from "react";
import styled from "styled-components";
// import starburst from "../../assets/icons/play-complete.svg";
import xpPng from "../../assets/xp.png";

const TotalXP = ({
  xp,
  top,
  left,
  position,
  width,
  height,
  color,
  isCenter,
  isXPChanged,
}) => {
  return (
    <TotalXPContainer
      top={top}
      left={left}
      position={position}
      width={width}
      height={height}
      color={color}
      isCenter={isCenter}
      isXPChanged={isXPChanged}
    >
      <p>
        {xp ? xp : ""}
        {xp ? <br /> : ""}
        XP
      </p>
    </TotalXPContainer>
  );
};

TotalXP.defaultProps = {
  xp: 0,
  top: "70%",
  left: "50%",
};

export default TotalXP;

const TotalXPContainer = styled.div`
  position: ${({ position }) => (position ? position : "absolute")};
  top: ${({ top }) => top && top};
  left: ${({ left }) => left && left};
  ${({ position }) => position && "left: 0;"}
  width: ${({ width }) => (width ? `${width}px` : "50px")};
  height: ${({ height }) => (height ? `${height}px` : "50px")};

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${xpPng});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  ${({ isCenter }) => isCenter && "transform: translate(-50%, -50%)"};

  /* border: 1px solid white; */

  p {
    font-weight: bold;
    font-size: 10px;
    color: white;
    ${({ color }) => color && `color: ${color}`}
  }
  @media (min-width: 769px) {
    height: 100px;
    width: 100px;
    ${({ width }) => width && `width: ${width}px`};
    ${({ height }) => height && `height: ${height}px`};
    p {
      font-size: 18px;
    }
  }
  
  ${({ isXPChanged }) => isXPChanged && "animation: rotate 3s linear;"}
  
  transform-style: preserve-3d;
  transform-origin: center;
  @keyframes rotate { 
    0% {
      transform: rotateY(0deg);
    }
    20% {
      transform: rotateY(180deg);
    }
    30% {
      transform: rotateY(0deg);
    }
    40% {
      transform: rotateY(180deg);
    }
    50% {
      transform: rotateY(0deg);
    }
    60% {
      transform: rotateY(180deg);
    }
    70% {
      transform: rotateY(0deg);
    }
    80% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0deg)
    }
  }
`;
