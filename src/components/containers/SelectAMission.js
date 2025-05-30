import { useEffect, useState } from "react";
import styled from "styled-components";
import BadgeCarouselContainer from "./BadgeCarouselContainer";
// import DoubleRoundedBorder from "./DoubleRoundedBorder";
import Button from "../atoms/Button";
import { calculateUserTotals, xpTotals } from "../../constants/constants";
import { withRouter } from "react-router-dom";
import SingleBorderFrame from "./SingleBorderFrame";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../../components/atoms/Header";

import TotalXP from "../atoms/TotalXP";
import TigerImg from "../../assets/tiger.png";
import SoundButton from "../atoms/SoundButton";
import { setCurrentMission } from "../../redux/actions/currentMissionAction";
import { current } from "@reduxjs/toolkit";

const SelectAMission = ({
  missions,
  progress,
  history,
  currentMission,
  dispatch,
}) => {
  let initial = null;
  missions.forEach((item) => {
    if (initial === null && item.missionType === "Training") initial = item;
  });
  const [selectedMissionID, setSelectedMissionID] = useState(
    currentMission || initial.id
  );
  const selectedMission = missions.filter(
    (item) => item.id === selectedMissionID
  )[0];
  const selectedMissionProgress = progress.filter(
    (item) => item.contentfulID === selectedMissionID
  )[0];
  const totalMissionXP = xpTotals();
  const userMissionXP = calculateUserTotals(
    selectedMissionProgress,
    selectedMission.missionType
  );
  const setMission = () => {
    let newPath = `/mission/${selectedMissionID}`;
    history.push(newPath);
  };
  useEffect(() => {
    dispatch(setCurrentMission(selectedMissionID));
  }, []);
  return (
    <SelectAMissionContainer>
      <DoubleBorderFrame width="100%" center={true} useMissionFrame HQ>
        <Header color="var(--light-cyan)" size="35pt" mobileSize={24}>
          [ MISSION ]
        </Header>

        <Header size="35pt" mobileSize={15}>
          Launch Your Next Mission
        </Header>
        <ContainerFlex>
          <SingleBorderFrame bgColor="rgba(22, 93, 180, 0.8)" width="100">
            <TotalXPContainer>
              <TotalXP
                xp={totalMissionXP - userMissionXP}
                position="relative"
              />
            </TotalXPContainer>
            <XPWithImage>
              <NeedXPContainer>
                <NeedXP>
                  To complete this mission, you need to collect{" "}
                  <GreenXP>{totalMissionXP - userMissionXP}</GreenXP>
                  XP
                </NeedXP>
              </NeedXPContainer>
              <ImgContainer>
                {selectedMission.backgroundImg ? (
                  <img
                    src={selectedMission.backgroundImg}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                ) : (
                  <img src={TigerImg} width={"100%"} height={"100%"} alt="" />
                )}
              </ImgContainer>

              <GoTraining>
                <DoubleBorderFrame
                  containerType={2}
                  padding={20}
                  center={true}
                  HQ
                >
                  <InstructionalHeader>
                    {selectedMission.name}
                  </InstructionalHeader>
                  {selectedMission.missionType === "Training" ? (
                    <>
                      <InstructionalText>
                        Start your training - {selectedMission.name}!
                      </InstructionalText>
                      <Button
                        text="Go Training"
                        width={200}
                        height={60}
                        textSize={24}
                        handleOnClick={setMission}
                      />
                    </>
                  ) : (
                    <>
                      <InstructionalText>
                        Start your Mission and {selectedMission.name}!
                      </InstructionalText>
                      <SoundButton>
                        <Button
                          text="Mission"
                          width={200}
                          height={60}
                          textSize={24}
                          handleOnClick={setMission}
                        />
                      </SoundButton>
                    </>
                  )}
                </DoubleBorderFrame>
              </GoTraining>
            </XPWithImage>
          </SingleBorderFrame>

          {/* <TaskWheelContainer
            mission={selectedMission}
            progress={selectedMissionProgress || {}}
            handleOnClick={pathFinder}
            size="350px"
          /> */}
        </ContainerFlex>
        <BadgeCarouselContainer
          items={missions}
          handleOnClick={setSelectedMissionID}
          currentMission={selectedMissionID}
        />
      </DoubleBorderFrame>
    </SelectAMissionContainer>
  );
};

export default withRouter(SelectAMission);

const SelectAMissionContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
`;

const ContainerFlex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
  // margin: auto;
  padding: 25px 0;
  width: 100%;
  margin-bottom: 50px;
  @media (min-width: 1024px) {
  }
  @media (min-width: 768px) {
    margin-bottom: 140px;
    width: 75%;
  }
  @media (min-width: 426px) {
    margin-bottom: 100px;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  max-height: 180px;
  @media (min-width: 426px) {
    max-height: 280px;
  }
  @media (min-width: 769px) {
    max-height: 350px;
  }
  @media (min-width: 1025px) {
    max-height: 350px;
  }
  @media (min-width: 1440px) {
    max-height: 350px;
  }
`;

const TotalXPContainer = styled.div`
  position: absolute;
  top: -20px;
  left: -10px;
  @media (min-width: 768px) {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
`;

const GoTraining = styled.div`
  position: absolute;
  top: 50%;
  left: -2px;
  width: 50%;

  @media (min-width: 768px) {
    left: -5%;
  }
  @media (min-width: 1024px) {
  }
`;

const XPWithImage = styled.div`
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
`;

const NeedXPContainer = styled.div`
  position: relative;
  min-width: 40%;
  min-height: 100%;
`;

const NeedXP = styled.div`
  position: absolute;
  top: 20%;
  padding-left: 20px;
  color: var(--cyan);
  text-align: left;
  font-size: 5pt;

  @media (min-width: 426px) {
    top: 12%;
    font-size: 9pt;
    letter-spacing: -0.4px;
  }
  @media (min-width: 769px) {
    top: 15%;
    font-size: 12pt;
  }
  @media (min-width: 1025px) {
    font-size: 16pt;
  }
`;

// const SideContainers = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 300px;
//   height: 200px;
//   padding: 15px;
//   box-sizing: content-box;
//   border: 1px solid var(--trans-cyan);
//   border-radius: var(--border-radius);
// `;
const GreenXP = styled.span`
  color: var(--green);
`;
const InstructionalHeader = styled.p`
  margin: 0;
  font-size: 10pt;
  color: var(--green);
  font-weight: bold;

  @media (min-width: 426px) {
    margin-bottom: 12px;
    font-size: 14pt;
  }
  @media (min-width: 1025px) {
    font-size: 20pt;
  }
`;
const InstructionalText = styled.p`
  max-width: 90%;
  margin: 0;
  font-size: 5pt;
  font-weight: bold;

  @media (min-width: 426px) {
    font-size: 10pt;
  }
  @media (min-width: 769px) {
    font-size: 12pt;
  }
  @media (min-width: 1025px) {
    font-size: 16pt;
  }
`;
