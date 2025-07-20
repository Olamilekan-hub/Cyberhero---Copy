import React, { useEffect } from "react";
import styled from "styled-components";
import DoubleBorderFrame from "./DoubleBorderFrame";
import xpSound from "../../assets/sound/collect-XP.mp3";
import SoundManager from '../../services/SoundManager';

const MissionComplete = ({
  badgeImg,
  continueClick,
  profileClick,
  restartClick,
}) => {
  const playSound = () => {
    SoundManager.play('xp');
  };
  return (
    <DoubleBorderFrame useMissionFrame width="80%">
      <InnerContainer>
        <p> Congratulations! </p>
        <Img src={badgeImg} />
        <ButtonContainer>
          <Button onClick={continueClick}>CONTINUE</Button>
          <Button onClick={profileClick}>PROFILE</Button>
          <Button onClick={restartClick}>RESTART</Button>
        </ButtonContainer>
      </InnerContainer>
    </DoubleBorderFrame>
  );
};

export default MissionComplete;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(70vh);

  p {
    font-size: 30px;
    color: var(--cyan);
    text-align: center;
  }
`;

const Img = styled.img`
  margin: 10px 0;
  width: 180px;
  border-radius: 50%;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const Button = styled.button`
  background-color: var(--cyan);
  color: navy;
  border: none;
  margin: 10px 0;
  height: 50px;
  width: 250px;
  font-size: 24px;

  :hover {
    cursor: pointer;
    background-color: white;
  }
`;
