import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useParams, withRouter } from "react-router-dom";
// import DoubleRoundedBorder from "../components/containers/DoubleRoundedBorder";
import TaskWheelContainer from "../components/containers/TaskWheelContainer";
import {
  calculateUserPowerAndCoin,
  calculateUserTotals,
  powerTotals,
  xpTotals,
} from "../constants/constants";
import ProgressWheel from "../components/atoms/ProgressWheel";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import ChallengeContainer from "../components/containers/ChallengeContainer";
import { updateProgress } from "../redux/actions/progressActions";
import { setCurrentMission } from "../redux/actions/currentMissionAction";
import { onTaskCompletion } from "../redux/managers/dataManager";
import Loading from "./Loading";
import { scrollToTop } from "../utils/utils";
import DoubleBorderFrame from "../components/containers/DoubleBorderFrame";
import SingleBorderFrame from "../components/containers/SingleBorderFrame";
import MissionComplete from "../components/containers/MissionComplete";
import MissionLoadingAnimation from "../components/containers/MissionLoadingAnimation";
import TrainingAreaContainer from "../components/containers/TrainingAreaContainer";

import AssetsContainer from "../components/containers/AssetsContainer";

import SoundButton from "../components/atoms/SoundButton";
const Mission = ({
  missions,
  progress,
  user,
  currentMission,
  dispatch,
  history,
}) => {
  let { missionID, taskName } = useParams();
  const [loading, setLoading] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(taskName || null);

  const [selectedMissionID, setSelectedMissionID] = useState(
    missionID || missions.missions[0]?.id
  );

  const [missionMode, setMissionMode] = useState("Training");
  const [isReChallenge, setIsReChallenge] = useState(false);
  const selectedMission = missions.missions.filter(
    (item) => item.id === selectedMissionID
  )[0];

  const [playAnimation, setPlayAnimation] = useState(
    typeof selectedMission?.animation === "undefined" ? false : true
  );

  const [isCoinAnimated, setIsCoinAnimated] = useState(false);
  const [isPerfect, setIsPerfect] = useState(false);
  let alternativeMissionProgress;
  const selectedMissionProgress =
    progress.progress.length > 0
      ? progress.progress.filter(
          (item) => item.contentfulID === selectedMissionID
        )[0]
      : undefined;
  const [quizLocked, setQuizLocked] = useState(
    selectedMissionProgress?.quiz || false
  );
  const [missionClicked, setMiissionClicked] = useState(false);
  if (selectedMission?.missionType === "Global")
    alternativeMissionProgress =
      progress.progress.length > 0
        ? progress.progress.filter(
            (item) =>
              item.missionName === selectedMission?.name &&
              item.missionType === "Training"
          )[0]
        : undefined;

  const totalMissionXP = xpTotals();
  const totalMissionPower = powerTotals();
  const userMissionXP = calculateUserTotals(
    selectedMissionProgress,
    selectedMissionProgress?.missionType
  );
  const userMissionPower =
    selectedMission?.missionType === "Global"
      ? calculateUserPowerAndCoin(alternativeMissionProgress, "power")
      : calculateUserPowerAndCoin(selectedMissionProgress, "power");
  const userMissionCoin = calculateUserPowerAndCoin(
    selectedMissionProgress,
    "coin"
  );
  const changeMission = (next) => {
    const missionsArr = missions.missions.filter(
      (item) => item.missionType === missionMode
    );
    const index = missionsArr.findIndex(
      (item) => item.id === selectedMissionID
    );
    let newIndex;
    if (!!next) {
      newIndex = index + 1;
      if (newIndex > missionsArr.length - 1) newIndex = 0;
    } else {
      newIndex = index - 1;
      if (newIndex < 0) newIndex = missionsArr.length - 1;
    }
    setSelectedMissionID(missionsArr[newIndex].id);
  };

  const selectTask = (value) => {
    setSelectedTask(value);
    scrollToTop();
  };

  const finishTask = async (task, missionType, articleID) => {
    try {
      // if (selectedMissionProgress && selectedMissionProgress[task]) return;
      const { userID } = user.data;
      const { name, id } = selectedMission;
      let body;
      let timeout;
      dispatch(setCurrentMission(selectedMissionID));
      if (task !== "quiz") {
        if (task !== "event" && selectedMissionProgress?.quiz) {
          body = {
            userID,
            missionName: name,
            missionType: missionType,
            articleID: { [articleID]: true },
            [task]: true,
            contentfulID: id,
          };
          setQuizLocked(false);
          if (isPerfect) setIsReChallenge(true);
        } else {
          body = {
            userID,
            missionName: name,
            missionType: missionType,
            articleID: { [articleID]: true },
            contentfulID: id,
            [task]: true,
          };
          if (isPerfect) setIsReChallenge(false);
        }
      } else {
        body = {
          userID,
          missionName: name,
          missionType: missionType,
          articleID,
          contentfulID: id,
          quiz: true,
        };

        setQuizLocked(true);
      }

      setMiissionClicked(true);
      setLoading(true);
      const progressResult = await dispatch(updateProgress(body));
      await dispatch(onTaskCompletion());
      if (
        Object?.values(
          progressResult?.[`${progressResult?.missionType}`]?.quiz
        )?.every((value) => value === true)
      ) {
        if (!isReChallenge) {
          setIsCoinAnimated(true);
          timeout = setTimeout(() => setMissionComplete(true), 3200);
        } else setIsCoinAnimated(false);
        setIsPerfect(true);
      } else setIsPerfect(false);
      setLoading(false);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const isChallengeUnlocked = () => {
    if (!selectedMissionProgress) return false;
    const temp =
      selectedMissionProgress[`${selectedMissionProgress.missionType}`];
    for (const key in temp)
      if (key !== "quiz")
        for (const index in temp[`${key}`])
          if (!temp[`${key}`][`${index}`]) return false;
    return true;
  };

  // const isQuizCompleted = () => {
  //   if (!selectedMissionProgress) return false;
  //   const temp =
  //     selectedMissionProgress[`${selectedMissionProgress.missionType}`];
  //   for (const key in temp.quiz) if (!temp.quiz[`${key}`]) return false;
  //   return true;
  // };
  const handleRestart = () => {
    setMissionComplete(false);
    setPlayAnimation(true);
  };
  const getLocation = () => {
    if (selectedTask)
      return (
        <LocationNavContainer>
          <SoundButton>
            <button
              onClick={() => {
                setSelectedTask(null);
              }}
            >
              Mission
            </button>
          </SoundButton>
          <span>&gt;</span>
          <SoundButton>
            <button
              onClick={() => {
                setMissionMode(selectedMission.missionType);
                setSelectedTask(null);
              }}
            >
              {selectedMission.missionType}
            </button>
          </SoundButton>
          <span>&gt;</span>
          <SoundButton>
            <button>{selectedTask}</button>
          </SoundButton>
        </LocationNavContainer>
      );
    else
      return (
        <>
          <button
            onClick={() => {
              setSelectedTask(null);
            }}
          >
            Mission
          </button>
          <span>&gt;</span>
          <button
            onClick={() => {
              setMissionMode(selectedMission.missionType);
              setSelectedTask(null);
            }}
          >
            {selectedMission.missionType}
          </button>
        </>
      );
  };
  useEffect(() => {
    const currentURL = window.location.pathname;
    const keyword = "/mission/";
    const keywordIndex = currentURL.indexOf(keyword);
    if (keywordIndex === -1) {
      currentMission.currentMission &&
        setSelectedMissionID(currentMission.currentMission);
    }
  }, []);
  useEffect(() => {
    const currentURL = window.location.pathname;
    const keyword = "/mission/";
    const keywordIndex = currentURL.indexOf(keyword);
    if (keywordIndex !== -1) {
      const extractedText = currentURL.substring(keywordIndex + keyword.length);
      const parts = extractedText.split("/");
      if (parts.length === 2) {
        const firstPart = parts[0];
        const secondPart = parts[1];
        setSelectedMissionID(firstPart);
        if (secondPart) setSelectedTask(secondPart);
      }
    } else {
      console.log("Keyword not found in the URL");
    }
    if (!selectedMission?.animation) setPlayAnimation(false);
    setMissionMode(selectedMission?.missionType);
    setQuizLocked(selectedMissionProgress?.quiz || false);

    if (
      selectedMissionProgress &&
      Object?.values(
        selectedMissionProgress?.[`${selectedMissionProgress?.missionType}`]
          ?.quiz
      )?.every((value) => value === true)
    )
      setIsPerfect(true);
    else setIsPerfect(false);
    setMiissionClicked(false);
    setMiissionClicked(false);

    dispatch(setCurrentMission(selectedMissionID));
  }, [selectedMissionID]);

  useEffect(() => {
    playAnimation ? window.scrollTo(0, 10000) : window.scrollTo(0, 0);
  }, [playAnimation]);

  if (!selectedMission) {
    return (
      <MainContainer>
        <h3>Mission not found!</h3>
      </MainContainer>
    );
  }
  if(!selectedMission.published) {
    return (
      <MainContainer>
        <h3>Coming soon...</h3>
      </MainContainer>
    );
  }
  if (missionComplete && isCoinAnimated)
    return (
      <MainContainer>
        <MissionComplete
          badgeImg={selectedMission.largeIcon}
          continueClick={() => setIsCoinAnimated(false)}
          profileClick={() => history.push("/profile")}
          restartClick={handleRestart}
        />
      </MainContainer>
    );
  else
    return (
      <MainContainer>
        <Location>{getLocation()}</Location>
        {loading && <Loading />}
        <Sizing>
          {selectedTask && selectedTask !== "challenge" ? (
            <TrainingAreaContainer
              data={selectedMission.articleGroup}
              currentStatus={selectedMissionProgress?.[`${selectedMission.missionType}`]}
              task={selectedTask}
              missionType={selectedMission.missionType}
              eventBG={selectedMission?.tasks?.event}
              assets={missions.missions[missions.missions.length - 1].assets}
              back={() => selectTask(null)}
              finishTask={finishTask}
              dispatch={dispatch}
              completed={totalMissionXP == userMissionXP}
            />
          ) : (
            <DoubleBorderFrame useMissionFrame>
              <HeaderContainer>
                <Row>
                  <SoundButton>
                    <IconButton
                      onClick={() => changeMission(false)}
                      isAnimationPlaying={playAnimation}
                    >
                      <FaChevronLeft />
                    </IconButton>
                  </SoundButton>
                  <h2>[ {selectedMission.name} ]</h2>
                  <SoundButton>
                    <IconButton
                      onClick={() => changeMission(true)}
                      isAnimationPlaying={playAnimation}
                    >
                      <FaChevronRight />
                    </IconButton>
                  </SoundButton>
                </Row>

                {selectedMission.missionType === "Training" ? (
                  <p>
                    Start training, earn XP from each task, take the
                    <span> CHALLENGE</span> and earn the badge.
                  </p>
                ) : (
                  <p>
                    Start Mission, earn XP from each task, take the
                    <span> CHALLENGE</span> and earn the badge.
                  </p>
                )}
              </HeaderContainer>
              {playAnimation && selectedMission.animation ? (
                <MissionLoadingAnimation
                  animation={selectedMission.animation}
                  handleOnEnded={() => setPlayAnimation(false)}
                />
              ) : (
                <>
                  <ContainerFlex>
                    <SideContainers>
                      <SingleBorderFrame width={"350px"} mobileSize={"100%"}>
                        <SideHeader>
                          <Title>Start Here!</Title>
                          {selectedMission.missionType === "Training" ? (
                            <SideContainerText>
                              Click the button and start your training!
                            </SideContainerText>
                          ) : (
                            <SideContainerText>
                              Click the button and start your Mission!
                            </SideContainerText>
                          )}
                        </SideHeader>

                        <TaskWheelContainer
                          mission={selectedMission}
                          progress={selectedMissionProgress || {}}
                          handleOnClick={selectTask}
                        />
                      </SingleBorderFrame>
                    </SideContainers>
                    <ProgressWheelContainer>
                      <ProgressWheel
                        xp={userMissionXP}
                        totalXP={totalMissionXP}
                        image={selectedMission.largeIcon}
                        showProgressText={true}
                        width="175px"
                        complete={isPerfect && !isReChallenge && isCoinAnimated}
                      />
                    </ProgressWheelContainer>
                    <MobileAssetsContainer>
                      <MobileProgressWheelContainer>
                        <ProgressWheel
                          xp={userMissionXP}
                          totalXP={totalMissionXP}
                          image={selectedMission.largeIcon}
                          showProgressText={true}
                          width="175px"
                        />
                      </MobileProgressWheelContainer>
                      <AssetsContainer
                        width={"50%"}
                        userMissionXP={userMissionXP}
                        userMissionPower={userMissionPower}
                        userMissionCoin={userMissionCoin}
                        totalMissionXP={totalMissionXP}
                        totalMissionPower={totalMissionPower}
                        missionClicked={missionClicked}
                        completed={
                          selectedMissionProgress?.complete &&
                          selectedMissionProgress.missionType === "Global"
                        }
                        missions
                      />
                    </MobileAssetsContainer>
                  </ContainerFlex>
                  <ChallengeContainer
                    unlocked={isChallengeUnlocked()}
                    tried={quizLocked}
                    completed={isPerfect}
                    quiz={selectedMission.tasks.quiz}
                    finishTask={finishTask}
                    missionType={selectedMission.missionType}
                  />
                </>
              )}
            </DoubleBorderFrame>
          )}
        </Sizing>
      </MainContainer>
    );
};

export default connect((state) => {
  return {
    missions: state.missions,
    progress: state.progress,
    user: state.user,
    currentMission: state.currentMission,
  };
})(withRouter(Mission));

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  min-height: calc(100vh - var(--nav-height));
`;

const Sizing = styled.div`
  width: 100%;
  /* height: 100%; */
  @media (min-width: 1268px) {
    width: 90%;
  }
`;
const HeaderContainer = styled.div`
  text-align: center;

  h2 {
    margin: 0;
    color: var(--cyan);
    font-size: 14pt;
  }
  p {
    color: var(--cyan);
    font-size: 12pt;
    font-weight: bold;
    letter-spacing: -0.7px;
  }
  span {
    color: white;
  }
  @media (min-width: 768px) {
    h2 {
      width: 400px;
      font-size: 24pt;
    }
    p {
      font-size: 16pt;
    }
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const IconButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 22px;
  :hover {
    cursor: pointer;
  }
  ${({ isAnimationPlaying }) =>
    isAnimationPlaying ? "display: none;" : "display: flex;"}
`;
const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 25px 0;

  @media (min-width: 425px) {
    margin-top: 0px;
  }
  @media (min-width: 769px) {
    margin-top: -40px;
    flex-direction: row;
    justify-content: space-evenly;
  }
  @media (min-width: 1025px) {
    margin-top: 0;
  }
`;
const SideContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: center;
  min-height: 468px;
  @media (min-width: 425px) {
    transform: scale(1);
  }
  @media (min-width: 769px) {
    transform: scale(0.8);
  }
  @media (min-width: 1025px) {
    transform: scale(1);
  }
  @media (min-width: 1268px) {
    margin: 0 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SideHeader = styled.div`
  padding: 0 10px;
`;

const Title = styled.div`
  font-size: 20pt;
  @media (min-width: 769px) {
    font-size: 25pt;
  }
`;

const SideContainerText = styled.p`
  color: var(--cyan);
  font-size: 14pt;
  font-weight: bold;
  letter-spacing: -0.7px;
  @media (min-width: 769px) {
    font-size: 16pt;
  }
`;

const LocationNavContainer = styled.div`
  display: flex;
`;
const Location = styled.div`
  margin: 0 0 16px 0px;
  width: 85%;
  text-align: left;
  button,
  span {
    font-size: 16px;
    background-color: transparent;
    color: var(--light-cyan);
    border: none;
  }
  button {
    cursor: pointer;
  }
`;

const MobileAssetsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    width: auto;
  }
`;

const ProgressWheelContainer = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: block;
  }
`;

const MobileProgressWheelContainer = styled.div`
  display: block;
  width: 50%;
  transform: scale(0.5);
  @media (min-width: 425px) {
    transform: scale(0.8);
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

const BGElementContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width 100%;
  height: 100%;
  opacity: 0.6;
  z-index: -1;
`;
