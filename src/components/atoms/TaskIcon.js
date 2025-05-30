import React from "react";
import styled from "styled-components";
import ActionIncomplete from "../../assets/icons/action-incomplete.png";
import ActionDisabled from "../../assets/icons/action-disabled.svg";
import ActionComplete from "../../assets/icons/action-complete.svg";
import ChallengeComplete from "../../assets/icons/challenge-complete.svg";
import ChallengeIncomplete from "../../assets/icons/challenge-incomplete.png";
import ChallengeDisabled from "../../assets/icons/challenge-disabled.svg";
import CreateComplete from "../../assets/icons/create-complete.svg";
import CreateIncomplete from "../../assets/icons/create-incomplete.png";
import CreateDisabled from "../../assets/icons/create-disabled.svg";
import EventComplete from "../../assets/icons/event-complete.svg";
import EventIncomplete from "../../assets/icons/event-incomplete.png";
import EventDisabled from "../../assets/icons/event-disabled.svg";
import PlayComplete from "../../assets/icons/play-complete.svg";
import PlayIncomplete from "../../assets/icons/play-incomplete.svg";
import PlayDisabled from "../../assets/icons/play-disabled.svg";
import ReadComplete from "../../assets/icons/read-complete.svg";
import ReadIncomplete from "../../assets/icons/read-incomplete.png";
import ReadDisabled from "../../assets/icons/read-disabled.svg";
import WatchComplete from "../../assets/icons/watch-complete.svg";
import WatchIncomplete from "../../assets/icons/watch-incomplete.png";
import WatchDisabled from "../../assets/icons/watch-disabled.svg";

// taskStates are "complete", "incomplete"
export default function TaskIcon({ taskName, taskState, handleOnClick }) {
  return (
    <MainContainer
      onClick={taskState !== "disabled" ? () => handleOnClick(taskName) : null}
    >
      <img
        src={getIcon(`${taskName}-${taskState}`)}
        alt={`${taskName}-${taskState}`}
      />
      <TaskText color={getColor(taskState)}>{taskName.toUpperCase()}</TaskText>
    </MainContainer>
  );
}

TaskIcon.defaultProps = {
  taskName: "read",
  taskState: "disabled",
  handleOnClick: () => console.log("Task clicked"),
};

const MainContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  min-height: 60px;
  min-width: 60px;

  :hover {
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const TaskText = styled.p`
  color: ${(props) => props.color && `${props.color}`};
  margin: 0;
  font-size: 10px;

  @media (min-width: 900px) {
    font-size: 14px;
  }
`;

const getColor = (taskState) => {
  switch (taskState) {
    case "complete":
      return `rgb(0, 255, 0)`;

    case "incomplete":
      return `rgb(0, 199, 199)`;

    default:
      return "white";
  }
};

const getIcon = (iconName) => {
  switch (iconName.toLowerCase()) {
    case "action-complete":
      return ActionComplete;
    case "action-incomplete":
      return ActionIncomplete;
    case "action-disabled":
      return ActionDisabled;
    case "challenge-complete":
      return ChallengeComplete;
    case "challenge-incomplete":
      return ChallengeIncomplete;
    case "challenge-disabled":
      return ChallengeDisabled;
    case "create-complete":
      return CreateComplete;
    case "create-incomplete":
      return CreateIncomplete;
    case "create-disabled":
      return CreateDisabled;
    case "event-complete":
      return EventComplete;
    case "event-incomplete":
      return EventIncomplete;
    case "event-disabled":
      return EventDisabled;
    case "play-complete":
      return PlayComplete;
    case "play-incomplete":
      return PlayIncomplete;
    case "play-disabled":
      return PlayDisabled;
    case "read-complete":
      return ReadComplete;
    case "read-incomplete":
      return ReadIncomplete;
    case "read-disabled":
      return ReadDisabled;
    case "watch-complete":
      return WatchComplete;
    case "watch-incomplete":
      return WatchIncomplete;
    case "watch-disabled":
      return WatchDisabled;
    default:
      return ActionDisabled;
  }
};
