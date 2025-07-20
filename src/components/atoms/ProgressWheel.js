import React, { useEffect, useRef, useState } from "react";
import { Circle } from "rc-progress";
import styled from "styled-components";
import hexagonFrame from "../../assets/hexagon-frame.svg";
import imageMask from "../../assets/imageMask.png";
import coinSound from "../../assets/sound/game-level-complete-143022.mp3";

import SoundManager from '../../services/SoundManager';

const ProgressWheel = ({
  xp,
  totalXP,
  image,
  showProgressText,
  width,
  complete,
}) => {
  const completeRef = useRef(null);
  
  useEffect(() => {
    if (completeRef.current !== null) {
      SoundManager.play('coin');
    }
    completeRef.current = true;
  }, [complete]);

  const getPercent = (totalXp, xp) => {
    let value = 0;
    value = (xp * 100) / totalXp;
    return value;
  };
  return (
    <MainContainer>
      <ContainerProgressWheel
        image={image}
        hexagonFrame={hexagonFrame}
        width={width}
      >
        {image && (
          <ImageContainer>
            <BackgroundImage bg={image} complete={complete} />
            <Image src={imageMask} />
          </ImageContainer>
        )}
        <Circle
          percent={getPercent(totalXP, xp)}
          strokeColor="var(--green)"
          trailColor={"#ddd"}
          trailWidth="3"
          strokeWidth="3"
        />
      </ContainerProgressWheel>
      {showProgressText && (
        <ProgressText>
          <span>{xp}</span>/{totalXP}
        </ProgressText>
      )}
    </MainContainer>
  );
};

ProgressWheel.defaultProps = {
  xp: 50,
  totalXP: 100,
  showProgressText: false,
};

export default ProgressWheel;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 425px) {
    margin: 0;
    transform: scale(1);
  }
  @media (min-width: 769px) {
    margin: 0 -30px;
    transform: scale(0.8);
  }
  @media (min-width: 1025px) {
    transform: scale(1);
  }
`;

const ContainerProgressWheel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "125px")};
  background-image: url(${String(hexagonFrame)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 120px;
  height: 110px;
`;

const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${({ bg }) => bg && `background-image: url(${bg});`}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${({ complete }) =>
    complete && "animation: scale 3s ease-in-out; z-index: 10;"}
  transform-style: preserve-3d;
  transform-origin: center;
  @keyframes scale {
    0% {
      transform: rotateY(0deg) scale(1);
    }
    15% {
      transform: rotateY(180deg) scale(2);
    }
    25% {
      transform: rotateY(0deg) scale(2);
    }
    30% {
      transform: rotateY(180deg) scale(2);
    }
    35% {
      transform: rotateY(0deg) scale(2);
    }
    40% {
      transform: rotateY(180deg) scale(2);
    }
    45% {
      transform: rotateY(0deg) scale(2);
    }
    50% {
      transform: rotateY(180deg) scale(2);
    }
    55% {
      transform: rotateY(0deg) scale(2);
    }
    60% {
      transform: rotateY(180deg) scale(2);
    }
    65% {
      transform: rotateY(0deg) scale(2);
    }
    70% {
      transform: rotateY(180deg) scale(2);
    }
    75% {
      transform: rotateY(0deg) scale(2);
    }
    80% {
      transform: rotateY(180deg) scale(2);
    }
    90% {
      transform: rotateY(0deg) scale(2);
    }
    100% {
      transform: rotateY(0deg) scale(1);
    }
  }
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ProgressText = styled.div`
  margin-top: 8px;
  font-size: 24px;
  font-weight: bold;

  span {
    color: var(--green);
  }
`;
