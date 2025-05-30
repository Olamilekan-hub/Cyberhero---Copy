//Core packages
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Components
import Bio from "../components/atoms/Bio";
import BadgeCarouselContainer from "../components/containers/BadgeCarouselContainer";
import ProfileLeaderBoard from "../components/atoms/ProfileLeaderBoard";
import ProgressWheel from "../components/atoms/ProgressWheel";
import HugeHeader from "../components/atoms/HugeHeader";
import TaskWheelContainer from "../components/containers/TaskWheelContainer";
import ArtContainer from "../components/containers/ArtContainer";
import Button from "../components/atoms/Button";
import BioModal from "../components/containers/BioModal";
import AvatarModal from "../components/containers/AvatarModal";
import Loading from "./Loading";

//Images&Icons
import spiderFrame from "../assets/profile-spider.png";
import bgElement from "../assets/HQ_bgElement.png";
// data/actions
import {
  calculateUserPowerAndCoin,
  calculateUserTotals,
  powerTotals,
  xpTotals,
} from "../constants/constants";
import {
  onProfileUpdate,
  onUserNameUpdate,
} from "../redux/managers/dataManager";
import Avatar from "../components/atoms/Avatar";
import SingleBorderFrame from "../components/containers/SingleBorderFrame";
import DoubleBorderFrame from "../components/containers/DoubleBorderFrame";
import CrestsBoard from "../components/atoms/CrestsBoard";
import AssetsContainer from "../components/containers/AssetsContainer";
import BackgroundImgSetting from "../components/containers/BackgroundImgSetting";

const Profile = ({
  history,
  dispatch,
  missions,
  progress,
  profile,
  art,
  leaderboard,
  avatars,
  achievements,
  user,
  currentMission,
  backgroundImages,
  currentBG,
}) => {
  const sortedData =
    achievements && [...achievements?.achievement].sort((a, b) => b.xp - a.xp);
  const [missionOngoing, setMissionOngoing] = useState(missions.missions[0]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [modalComponent, setModalComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(`${user.data.username}`);
  const [rank, setRank] = useState(0);
  const selectedMissionProgress =
    progress.progress.length > 0
      ? progress.progress.filter(
          (item) => item?.contentfulID === currentMission?.currentMission
        )[0]
      : undefined;
  let ongoingMissionTotalXP = 0;
  let ongoingMissionXP = 0;

  let totalXP = 0;
  let totalPower = 0;
  let userTotalXP = 0;
  let userTotalPower = 0;
  let userTotalCoin = 0;
  ongoingMissionTotalXP = xpTotals();
  ongoingMissionXP += calculateUserTotals(
    selectedMissionProgress,
    selectedMissionProgress?.missionType
  );
  progress.progress.forEach((item) => {
    totalXP += xpTotals();
    if (item.missionType === "Training") totalPower += powerTotals();
  });
  progress.progress.forEach((item) => {
    userTotalXP += calculateUserTotals(item, item.missionType);
    userTotalPower += calculateUserPowerAndCoin(item, "power");
    userTotalCoin += calculateUserPowerAndCoin(item, "coin");
  });
  useEffect(() => {
    determineMission();
    determineAchievements();

    sortedData.map((item, index) => {
      if (item.userID === user.data.userID) setRank(index + 1);
      return sortedData;
    });
    missions.missions.forEach((item) => {
      item.id === currentMission.currentMission && setMissionOngoing(item);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const determineMission = () => {
    const userProgress = progress.progress;
    const notComplete = userProgress.filter((item) => !item.complete);

    if (notComplete.length > 0) {
      const selectedMission = missions.missions.filter(
        (item) => item.id === notComplete[0].contentfulID
      );
      if (selectedMission.length > 0) setMissionOngoing(selectedMission[0]);
    }
  };

  const determineAchievements = () => {
    const allMissions = missions.missions;
    const userProgress = progress.progress;

    const completed = userProgress.filter((item) => item.complete);

    let achievementArray = [];
    completed.forEach((complete) => {
      const m = allMissions.filter(
        (mission) => mission.id === complete.contentfulID
      );
      m.length > 0 && achievementArray.push(m[0]);
    });

    setCompletedMissions(achievementArray);
  };

  const getAvatar = () => {
    const { avatarID, petID } = profile.data;
    const chosenHuman = avatars.avatars.AvatarList.filter(
      (item) => item.id === avatarID
    );
    const chosenPet = avatars.avatars.AvatarList.filter(
      (item) => item.id === petID
    );
    if (chosenHuman.length > 0 && chosenPet.length > 0)
      return { human: chosenHuman[0].img, pet: chosenPet[0].img };
    return avatars.avatars.AvatarList.length > 0
      ? avatars.avatars.AvatarList[0].img
      : null;
  };
  const getCrests = () => {
    const temp = [];
    avatars?.avatars?.Crests.map((item) => {
      temp.push(item.img);
      return avatars;
    });
    return temp;
  };

  const changeProfileData = async (bio, avatarID, petID, backgroundImg) => {
    try {
      setLoading(true);
      await dispatch(onProfileUpdate(bio, avatarID, petID, backgroundImg));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };

  const handleNameInput = (e) => {
    const match = e.target.value.match(/\[ (.+?) \]/);
    const result = match ? match[1] : null;
    setUserName(result);
  };

  const handleKeyDown = async (e) => {
    try {
      if (e.key === "Enter") {
        setLoading(true);
        await dispatch(onUserNameUpdate(userName));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };
  return (
    <MainContainer>
      <Location>Profile</Location>
      {loading && <Loading />}
      {modalComponent ? (
        modalComponent
      ) : (
        <>
          <TabletMainContainer>
            <DoubleBorderFrame width={"90%"}>
              <UserNameContainer>
                <UserNameInput
                  value={`[ ${userName} ]`}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handleNameInput(e)}
                />
              </UserNameContainer>
              <Row>
                <ParentContainer>
                  <CrestsBoard crests={getCrests()} />
                  <ProfileLeaderBoard
                    img={currentBG.currentBG}
                    onClick={() =>
                      setModalComponent(
                        <BackgroundImgSetting
                          onClose={() => setModalComponent(null)}
                          dispatch={dispatch}
                          onSubmit={changeProfileData}
                          backgroundImages={
                            backgroundImages?.backgroundImages[
                              "Background Images"
                            ]
                          }
                        />
                      )
                    }
                  />
                  <div>
                    <h3>Bio</h3>
                    <Bio
                      usersBio={profile.data.bio}
                      handleEdit={() =>
                        setModalComponent(
                          <BioModal
                            onClose={() => setModalComponent(null)}
                            onSubmit={changeProfileData}
                            startingValue={profile.data.bio}
                          />
                        )
                      }
                    />
                  </div>
                </ParentContainer>
                <HexContainer>
                  <button
                    onClick={() =>
                      setModalComponent(
                        <AvatarModal
                          onClose={() => setModalComponent(null)}
                          onSubmit={changeProfileData}
                          startingValue={profile.data.avatarID}
                          avatarList={avatars.avatars.AvatarList}
                        />
                      )
                    }
                  >
                    <SavedAvatarContainer>
                      <SavedHumanAvatarContainer>
                        <Avatar img={getAvatar()?.human} />
                      </SavedHumanAvatarContainer>
                      <SavedPetAvatarContainer>
                        <Avatar img={getAvatar()?.pet} />
                      </SavedPetAvatarContainer>
                    </SavedAvatarContainer>
                  </button>
                </HexContainer>
                <ParentContainer>
                  <AssetsContainer
                    userMissionXP={userTotalXP}
                    userMissionPower={userTotalPower}
                    userMissionCoin={userTotalCoin}
                    totalMissionXP={totalXP}
                    totalMissionPower={totalPower}
                    completed
                  />
                </ParentContainer>
              </Row>
              <h3>Badges</h3>
              <Row>
                <BadgeCarouselContainer
                  emptyShow
                  missions={missions.missions}
                  items={completedMissions}
                  useFilledFrame={true}
                  currentMission={currentMission}
                />
              </Row>
            </DoubleBorderFrame>
          </TabletMainContainer>

          <MobileMainContainer>
            <DoubleBorderFrame width={"90%"}>
              <UserNameContainer>
                <UserNameInput
                  value={`[ ${userName} ]`}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handleNameInput(e)}
                />
              </UserNameContainer>
              <Row>
                <HexContainer>
                  <button
                    onClick={() =>
                      setModalComponent(
                        <AvatarModal
                          onClose={() => setModalComponent(null)}
                          onSubmit={changeProfileData}
                          startingValue={profile.data.avatarID}
                          avatarList={avatars.avatars.AvatarList}
                        />
                      )
                    }
                  >
                    <SavedAvatarContainer>
                      <SavedHumanAvatarContainer>
                        <Avatar img={getAvatar()?.human} />
                      </SavedHumanAvatarContainer>
                      <SavedPetAvatarContainer>
                        <Avatar img={getAvatar()?.pet} />
                      </SavedPetAvatarContainer>
                    </SavedAvatarContainer>
                  </button>
                </HexContainer>

                <ParentContainer>
                  <MobileCrestContainer>
                    <CrestsBoard crests={getCrests()} />
                    <LeaderBoardContainer>
                      <ProfileLeaderBoard
                        img={currentBG.currentBG}
                        onClick={() =>
                          setModalComponent(
                            <BackgroundImgSetting
                              onClose={() => setModalComponent(null)}
                              dispatch={dispatch}
                              backgroundImages={
                                backgroundImages?.backgroundImages[
                                  "Background Images"
                                ]
                              }
                            />
                          )
                        }
                      />
                    </LeaderBoardContainer>
                  </MobileCrestContainer>
                  <BioContainer>
                    <h3>Bio</h3>
                    <Bio
                      usersBio={profile.data.bio}
                      handleEdit={() =>
                        setModalComponent(
                          <BioModal
                            onClose={() => setModalComponent(null)}
                            onSubmit={changeProfileData}
                            startingValue={profile.data.bio}
                          />
                        )
                      }
                    />
                  </BioContainer>
                </ParentContainer>

                <ParentContainer>
                  <h3>My Assets</h3>
                  <AssetsContainer
                    userMissionXP={userTotalXP}
                    userMissionPower={userTotalPower}
                    userMissionCoin={userTotalCoin}
                    totalMissionXP={totalXP}
                    totalMissionPower={totalPower}
                    completed
                    profile
                  />
                </ParentContainer>
              </Row>
              <h3>Badges</h3>
              <Row>
                <BadgeCarouselContainer
                  emptyShow
                  missions={missions.missions}
                  items={completedMissions}
                  useFilledFrame={true}
                  currentMission={currentMission}
                />
              </Row>
            </DoubleBorderFrame>
          </MobileMainContainer>
        </>
      )}
      <HeaderContainer />

      <DoubleBorderFrame width={"90%"}>
        {
          ongoingMissionXP < ongoingMissionTotalXP ? 
            <HugeHeader>MISSION ON GOING</HugeHeader> :
            <HugeHeader>START A NEW MISSION</HugeHeader>
        }
        <MissionOnGoingContainer>
          <MissionOnGoingChild>
            <SingleBorderFrame width={"100%"}>
              <p>
                To complete this mission, you need to collect{" "}
                <GreenXP>{ongoingMissionTotalXP - ongoingMissionXP}</GreenXP>
                XP
              </p>
              <ProgressWheel
                xp={ongoingMissionXP}
                totalXP={ongoingMissionTotalXP}
                image={missionOngoing?.largeIcon}
              />
            </SingleBorderFrame>
          </MissionOnGoingChild>

          <TaskWheelContainer
            mission={missionOngoing}
            progress={selectedMissionProgress}
            handleOnClick={(taskName) =>
              history.push(`mission/${missionOngoing.id}/${taskName}`)
            }
            size="375px"
            profile
          />
          <MissionOnGoingChild>
            <SingleBorderFrame width={"100%"}>
              <InstructionalHeader>{missionOngoing?.name}</InstructionalHeader>
              <InstructionalText>
                Start your training, complete the mission and help{" "}
                {missionOngoing?.name}!
              </InstructionalText>
              <Button
                text="Go Training"
                handleOnClick={() =>
                  history.push(`/mission/${missionOngoing?.id}`)
                }
              />
            </SingleBorderFrame>
          </MissionOnGoingChild>
        </MissionOnGoingContainer>
      </DoubleBorderFrame>

      <HeaderContainer />

      <DoubleBorderFrame width={"90%"}>
        <ArtHead>
          <HugeHeader>FILE REPORT</HugeHeader>
          <p>View your artwork</p>
        </ArtHead>
        <ArtContainer
          art={art.userArt}
          favorited={art.favoriteArt}
          dispatch={dispatch}
          setLoading={setLoading}
          fromProfile
        />
      </DoubleBorderFrame>
    </MainContainer>
  );
};

export default connect((state) => {
  return {
    missions: state.missions,
    progress: state.progress,
    user: state.user,
    profile: state.profile,
    art: state.art,
    leaderboard: state.leaderboard,
    avatars: state.avatars,
    achievements: state.achievements,
    currentMission: state.currentMission,
    backgroundImages: state.backgroundImages,
    currentBG: state.currentBG,
  };
})(withRouter(Profile));

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  min-height: calc(100vh - var(--nav-height));
  text-align: center;
`;

const MobileMainContainer = styled.div`
  width: 100%;
  display: block;
  justify-content: center;
  @media (min-width: 769px) {
    display: none;
  }
`;
const TabletMainContainer = styled.div`
  display: none;
  width: 100%;
  @media (min-width: 769px) {
    display: flex;
    justify-content: center;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  justify-content: center;
  color: var(--cyan);
  font-size: 30px;
`;
const UserNameInput = styled.input`
  width: fit-content;
  color: var(--cyan);
  background-color: transparent;
  font-size: 30px;
  text-align: center;
  border: none;
  :focus-visible {
    outline: none;
  }
`;

const Location = styled.div`
  margin: 0 0 32px 0px;
  width: 85%;
  color: var(--light-cyan);
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
  @media (min-width: 769px) {
    align-items: center;
    gap: 0;
  }
`;

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  width: 40%;
  h3 {
    min-height: 30px;
    font-size: 10px;
  }
  @media (min-width: 426px) {
    h3 {
      min-height: 30px;
      font-size: 1.17em;
    }
  }
  @media (min-width: 769px) {
    max-width: 300px;
    transform: scale(0.7);
    h3 {
      font-size: 1.17em;
    }
  }
  @media (min-width: 1025px) {
  }
  @media (min-width: 1268px) {
    margin: 0;
  }
  @media (min-width: 1441px) {
    transform: scale(1);
  }
`;
const BioContainer = styled.div`
  @media (min-width: 769px) {
    width: 300px;
  }
`;

const HexContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-top: 60px;
  background-image: url(${spiderFrame});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;

  /* border: 1px solid white; */
  @media (min-width: 426px) {
    height: 120px;
    min-width: 120px;
  }
  @media (min-width: 768px) {
    margin: 0;
    min-height: 300px;
    min-width: 300px;
  }
  button {
    background-color: transparent;
    border-radius: 50%;
    border: none;
    padding: 10%;
    width: 100%;
    height: 100%;
    // Only because it was off-center for some reason
    /* border: 1px solid yellow; */
    :hover {
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    margin: 0 -150px;
    min-height: 370px;
    min-width: 370px;
    transform: scale(0.4);
  }
  @media (min-width: 1024px) {
    margin: 0 -70px;
    transform: scale(0.6);
  }
  @media (min-width: 1441px) {
    margin: 0;
    transform: scale(1);
  }
`;

const MobileCrestContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  @media (min-width: 769px) {
  }
`;

const LeaderBoardContainer = styled.div`
  flex-grow: 1;
  @media (min-width: 769px) {
    flex-grow: 0;
  }
`;

const HeaderContainer = styled.div`
  margin: 50px 0;
`;
const MissionOnGoingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* flex-wrap: wrap; */
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const GreenXP = styled.span`
  color: var(--green);
`;

const MissionOnGoingChild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  min-height: 225px;
  @media (min-width: 426px) {
    width: 300px;
  }
`;

const InstructionalHeader = styled.p`
  color: var(--cyan);
  font-weight: bold;
`;

const InstructionalText = styled.p`
  font-weight: bold;
`;

const ArtHead = styled.div`
  p {
    color: var(--cyan);
    font-weight: 600;
    font-size: 20px;
  }
`;

const SavedAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80%;
`;

const SavedHumanAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  img {
    margin-right: -30px;
    height: 100%;
  }
  @media (min-width: 769px) {
    img {
      margin-right: -110px;
    }
  }
`;
const SavedPetAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;

  img {
    margin-left: -10px;
    height: 60%;
    z-index: -1;
  }
  @media (min-width: 425px) {
    img {
      margin-left: -40px;
    }
  }
  @media (min-width: 769px) {
    img {
      position: relative;
      margin-left: -100px;
      // background-image: url(${bgElement});
      background-size: 100% 100%;
    }
  }
`;
