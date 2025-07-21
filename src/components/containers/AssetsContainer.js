import { Circle } from "rc-progress";
import styled from "styled-components";
import SingleBorderFrame from "./SingleBorderFrame";
import TotalXP from "../atoms/TotalXP";
import Header from "../atoms/Header";

import Certificate1 from "../../assets/certificate1.png";
import Certificate2_2 from "../../assets/certificate2-2.png";
import GradientProgressbar from "../atoms/GradientProgressbar";

import Crest from "../atoms/Crest";

import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

import CloseIcon from "../../assets/close.svg";
// import xpSound from "../../assets/sound/collect-XP.mp3";
import SoundManager from '../../services/SoundManager';
const AssetsContainer = ({
  width,
  userMissionXP,
  totalMissionXP,
  userMissionPower,
  totalMissionPower,
  userMissionCoin,
  missionClicked,
  completed,
  missions,
  profile,
}) => {
  const [isCoinChanged, setIsCoinChanged] = useState(false);
  const [isXPChanged, setIsXPChanged] = useState(false);
  const [prevCoin, setPrevCoin] = useState(userMissionCoin);
  const [prevXP, setPrevXP] = useState(userMissionXP);
  useEffect(() => {
    if (missionClicked && prevCoin !== userMissionCoin) {
      setIsCoinChanged(true);
      SoundManager.play('xp');
      let timeout = setTimeout(() => {
        setIsCoinChanged(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    } else setIsCoinChanged(false);
    setPrevCoin(userMissionCoin);
  }, [userMissionCoin, missionClicked]);
  useEffect(() => {
    if (missionClicked && prevXP !== userMissionXP) setIsXPChanged(true);
    else setIsXPChanged(false);
    setPrevXP(userMissionXP);
  }, [userMissionXP, missionClicked]);
  return (
    <SideContainers width={width} isMissions={missions} profile={profile}>
      <SingleBorderFrame
        width={"350px"}
        mobileSize={"100%"}
        space={"space-between"}
      >
        <Title color={"white"} profile={profile}>
          My Assets
        </Title>
        <MobileContainer isMissions={missions}>
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            emulateTouch={true}
            showStatus={false}
            showIndicators={false}
          >
            <XP isMissions={missions}>
              <CircularXPContainer>
                <TotalXPContainer>
                  <TotalXP
                    position={"relative"}
                    width={50}
                    height={50}
                    color={"var(--blue)"}
                    isXPChanged={isXPChanged}
                  />
                </TotalXPContainer>
                <Circle
                  percent={(userMissionXP * 100) / totalMissionXP}
                  strokeColor="var(--green)"
                  trailColor={"#ddd"}
                  trailWidth="3"
                  strokeWidth="3"
                  width={80}
                  height={80}
                />
              </CircularXPContainer>
              <XPContainer>
                <Header color={"white"} size="12pt">
                  <span>XP</span> <img src={CloseIcon} width={10} alt="" />{" "}
                  <span>{userMissionXP}</span>
                </Header>
              </XPContainer>
            </XP>
            <Power isMissions={missions}>
              <GradientProgressbarContainer>
                <img src={Certificate1} width={50} alt="" />
                <GradientProgressbar
                  width={150}
                  height={15}
                  percentage={(userMissionPower * 100) / totalMissionPower}
                  profile={profile}
                />
              </GradientProgressbarContainer>
              <XPContainer>
                <Header color={"white"} size="12pt">
                  <span>Power</span> <img src={CloseIcon} width={10} alt="" />{" "}
                  <span>{userMissionPower}</span>
                </Header>
              </XPContainer>
            </Power>
            <CertificateItem isMissions={missions}>
              <IconContainer isCoinChanged={isCoinChanged}>
                <img src={Certificate2_2} width={50} alt="" />
              </IconContainer>
              <Header color={"white"} size="12pt">
                Digital Coin
                <div>
                  <img src={CloseIcon} width={10} alt="" /> {userMissionCoin}
                </div>
              </Header>
            </CertificateItem>

            <CertificateItem isMissions={missions}>
              <IconContainer>
                {completed ? (
                  <Crest isFilled={true} mission />
                ) : (
                  <Crest isFilled={false} mission />
                )}
              </IconContainer>
              <Header color={"white"} size="12pt">
                Hero Action
                <div>
                  <img src={CloseIcon} width={10} alt="" />{" "}
                  {completed ? 100 : 0}
                </div>
              </Header>
            </CertificateItem>
          </Carousel>
        </MobileContainer>

        <TabletContainer isMissions={missions}>
          <XPContainer>
            <Header color={"white"} size="12pt" align="left">
              <span>XP</span> <img src={CloseIcon} width={10} alt="" />{" "}
              <span>{userMissionXP}</span>
            </Header>
          </XPContainer>
          <CircularXPContainer>
            <TotalXPContainer>
              <TotalXP
                position={"relative"}
                width={profile ? 40 : 60}
                height={profile ? 40 : 60}
                color={"var(--blue)"}
                isXPChanged={isXPChanged}
              />
            </TotalXPContainer>
            <Circle
              percent={(userMissionXP * 100) / totalMissionXP}
              strokeColor="var(--green)"
              trailColor={"#ddd"}
              trailWidth="3"
              strokeWidth="3"
              width={profile ? 60 : 80}
              height={profile ? 60 : 80}
            />
          </CircularXPContainer>
          <XPContainer>
            <Header color={"white"} size="12pt" align="left">
              <span>Power</span> <img src={CloseIcon} width={10} alt="" />{" "}
              <span>{userMissionPower}</span>
            </Header>
          </XPContainer>
          <GradientProgressbarContainer profile={profile}>
            <img src={Certificate1} alt="" />
            <GradientProgressbar
              width={150}
              height={15}
              percentage={(userMissionPower * 100) / totalMissionPower}
              profile={profile}
            />
          </GradientProgressbarContainer>
          <Certificate profile={profile}>
            <CertificateItem isMissions={missions}>
              <IconContainer profile={profile} isCoinChanged={isCoinChanged}>
                <img src={Certificate2_2} width={profile ? 35 : 50} alt="" />
              </IconContainer>
              <Header color={"white"} size={"12pt"} profile={profile}>
                Digital Coin
                <div>
                  <img src={CloseIcon} width={10} alt="" /> {userMissionCoin}
                </div>
              </Header>
            </CertificateItem>
            <CrossLine />
            <CertificateItem isMissions={missions}>
              <IconContainer>
                {completed ? (
                  <Crest isFilled={true} mission />
                ) : (
                  <Crest isFilled={false} mission />
                )}
              </IconContainer>
              <Header color={"white"} size={"12pt"} profile={profile}>
                Hero Action
                <div>
                  <img src={CloseIcon} width={10} alt="" />{" "}
                  {completed ? 100 : 0}
                </div>
              </Header>
            </CertificateItem>
          </Certificate>
        </TabletContainer>
      </SingleBorderFrame>
    </SideContainers>
  );
};

export default AssetsContainer;

const MobileContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  ${({ isMissions }) => (isMissions ? "display: block;" : "display: none;")}

  @media (min-width: 769px) {
    display: none;
  }
`;

const TabletContainer = styled.div`
  height: 100%;
  ${({ isMissions }) => (isMissions ? "display: none;" : "display: flex;")}
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 769px) {
    display: flex;
  }
`;
const SideContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: center;
  max-width: 360px;
  ${({ width }) => width && `width: ${width}`};
  ${({ profile }) => profile && "margin: 0;"}
  height: 100%;
  @media (min-width: 425px) {
    transform: scale(1);
  }
  @media (min-width: 769px) {
    width: 100%;
    min-height: 468px;

    ${({ isMissions }) => isMissions && `transform: scale(0.8);`}
  }
  @media (min-width: 1025px) {
    transform: scale(1);
  }
  @media (min-width: 1268px) {
    margin: 0 20px;
  }
  .carousel .slide {
    background: transparent;
  }
  .carousel .control-arrow,
  .carousel.carousel-slider .control-arrow {
    opacity: 1;
  }
  .carousel .slide img {
    width: revert-layer;
    vertical-align: middle;
  }
`;

const CircularXPContainer = styled.div`
  position: relative;
  TotalXP {
    transform: translate(-50%, -50%);
  }
`;

const GradientProgressbarContainer = styled.div`
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: relative;
    margin-right: -2px;
    ${(profile) => profile && "width: 40px;"}
    z-index: 1;
  }
  @media (min-width: 426px) {
    img {
      width: 50px;
    }
  }
  @media (min-width: 769px) {
    width: auto;
  }
`;

const Certificate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ profile }) => (profile ? "gap: 10px;" : "gap: 20px;")}
  @media (min-width: 426px) {
  }
  @media (min-width: 769px) {
  }
`;

const CertificateItem = styled.div`
  ${({ isMissions }) => isMissions && "transform: scale(0.7);"}
  @media (min-width: 426px) {
    transform: scale(1);
  }
`;

const IconContainer = styled.div`
  height: 45px;
  @media (min-width: 769px) {
    height: 65px;
  }
  ${({ isCoinChanged }) => isCoinChanged && "animation: rotate 3s linear;"}

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
      transform: rotateY(0deg);
    }
  }
`;

const TotalXPContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const XPContainer = styled.div`
  padding: 0 15px;
  width: 100%;
  text-align: left;
`;

const CrossLine = styled.div`
  width: 1px;
  height: 60px;
  background: var(--trans-cyan);
`;

const Title = styled.div`
  font-size: 12pt;
  @media (min-width: 425px) {
    font-size: 16pt;
  }
  @media (min-width: 769px) {
    font-size: 25pt;
  }
  ${({ profile }) => profile && "display: none;"}
`;

const XP = styled.div`
  ${({ isMissions }) => isMissions && "transform: scale(0.7);"}
  @media (min-width: 426px) {
    transform: scale(1);
  }
`;
const Power = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ isMissions }) => isMissions && "transform: scale(0.7);"}
  @media (min-width: 426px) {
    transform: scale(1);
  }
`;
