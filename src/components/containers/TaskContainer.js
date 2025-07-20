import React, { useState } from "react";
import styled from "styled-components";
import Watch from "../atoms/Watch";
import Read from "../atoms/Read";
import Create from "../atoms/Create";
import Button from "../atoms/Button";
import Event from "../atoms/Event";
import { RiArrowGoBackLine } from "react-icons/ri";
import DoubleBorderFrame from "./DoubleBorderFrame";
import TotalXP from "../atoms/TotalXP";

import xpSound from "../../assets/sound/collect-XP.mp3";
import shareNotification from "../../assets/Notification-34.png";
import saveNotification from "../../assets/Notification-35.png";
import SoundButton from "../atoms/SoundButton";

import SoundManager from '../../services/SoundManager';

const TaskContainer = ({
  task,
  missionType,
  backToMission,
  backToSelect,
  eventBG,
  articleID,
  tasksData,
  assets,
  finishTask,
  setBG,
  dispatch,
}) => {
  const [visibility, setVisibility] = useState(false);
  const [isNotification, setIsNotification] = useState(null);
  const onComplete = async () => {
    setVisibility(true);
    setTimeout(() => {
      finishTask(task, missionType, articleID);
      backToMission();
    }, 1000);
  };

  const renderTask = () => {
    switch (task) {
      case "read":
        return (
          <Read
            text={tasksData.read}
            image={tasksData.artwork}
            assets={assets}
          />
        );
      case "action":
        return <Read text={tasksData.action} />;
      case "watch":
        return <Watch video={tasksData.watch} />;
      case "create":
        return (
          <Create
            dispatch={dispatch}
            onComplete={onComplete}
            isNotification={setIsNotification}
          />
        );
      case "event":
        return <Event back={backToMission} bg={eventBG} />;
      default:
        return null;
    }
  };
  const getButtonText = () => {
    switch (task) {
      case "action":
        return "I Accept";
      default:
        return "Complete";
    }
  };
  const backAlert = () => {
    if (window.confirm("Are you sure you want to go back?")) {
      backToSelect();
    }
  };
  const playSound = () => {
  SoundManager.play('xp');
};
  return isNotification ? (
    isNotification === "share" ? (
      <NotificationImg><img src={shareNotification} alt="" /></NotificationImg>
    ) : (
      <NotificationImg><img src={saveNotification} alt="" /></NotificationImg>
    )
  ) : (
    <DoubleBorderFrame>
      <HeaderContainer>
        <BackButtonContainer>
          <SoundButton>
            <button
              onClick={() => {
                backAlert();
                setBG(1);
              }}
            >
              <RiArrowGoBackLine />
            </button>
          </SoundButton>
        </BackButtonContainer>

        <Head>{task}</Head>
      </HeaderContainer>

      {renderTask()}

      {/* Create has its own buttons for saving/sharing */}
      {task !== "create" && (
        <ButtonContainer>
          <Button
            text={getButtonText()}
            handleOnClick={() => {
              onComplete();
              setBG(1);
              playSound();
            }}
            width={250}
            height={55}
            textSize={25}
          />
          <XPContainer visibility={visibility}>
            <TotalXP position={"relative"} left={0} />
          </XPContainer>
        </ButtonContainer>
      )}
    </DoubleBorderFrame>
  );
};

export default TaskContainer;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const XPContainer = styled.div`
  display: none;
  justify-content: center;
  ${({ visibility }) => visibility && `display: flex;`}
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 30px;

    :hover {
      cursor: pointer;
    }
  }
`;
const ButtonContainer = styled.div`
  position: relative;
  margin: 15px 0;
`;
const Head = styled.h1`
  text-transform: capitalize;
`;

const NotificationImg = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`