import React from "react";
import styled from "styled-components";
import TaskIcon from "../atoms/TaskIcon";
import hexagonFrame from "../../assets/hexagon-frame.svg";
import SoundButton from "../atoms/SoundButton";
export default function TaskWheelContainer({
  mission,
  progress,
  handleOnClick,
  size,
  profile,
}) {
  const getTaskState = (taskState) => {
    if (taskState !== "event") {
      const temp = progress?.[`${progress?.missionType}`]?.[`${taskState}`];
      if (temp)
        for (const key in temp) {
          if (!temp?.[`${key}`]) return "incomplete";
        }
      else return "incomplete";
      return "complete";
    } else {
      if (progress?.event) return "complete";
      return "incomplete";
    }
  };
  return (
    <TasksContainer size={size} profile={profile}>
      <PositionContainer left="40%" top="4%">
        <SoundButton>
          <TaskIcon
            taskName="watch"
            taskState={getTaskState("watch")}
            handleOnClick={handleOnClick}
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer left="4%" top="20%">
        <SoundButton>
          <TaskIcon
            taskName="challenge"
            taskState={getTaskState("quiz") == "complete" ? "disabled" : getTaskState("quiz")}
            handleOnClick={handleOnClick}
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer right="8%" top="20%">
        <SoundButton>
          <TaskIcon
            taskName="read"
            taskState={getTaskState("read")}
            handleOnClick={handleOnClick}
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer left="4%" bottom="30%">
        <SoundButton>
          <TaskIcon
            taskName="event"
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer right="5%" bottom="30%">
        <SoundButton>
          <TaskIcon
            taskName="create"
            taskState={getTaskState("create") == "complete" ? "disabled" : getTaskState("create")}
            handleOnClick={handleOnClick}
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer left="27%" bottom="8%">
        <SoundButton>
          <TaskIcon
            taskName="action"
            taskState={getTaskState("action")}
            handleOnClick={handleOnClick}
          />
        </SoundButton>
      </PositionContainer>
      <PositionContainer right="25%" bottom="8%">
        <SoundButton>
          <TaskIcon taskName="play" />
        </SoundButton>
      </PositionContainer>

      <ImageDiv image={mission?.smallIcon}>
        <Image src={mission?.smallIcon} />
      </ImageDiv>
    </TasksContainer>
  );
}
TaskWheelContainer.defaultProps = {
  size: "300px",
};
const TasksContainer = styled.div`
  position: relative;
  align-self: center;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  @media (max-width: 425px) {
    ${({ profile }) => profile && "transform: scale(0.8);"}
  }
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - 25%);
  top: calc(50% - 25%);
  height: 50%;
  width: 50%;
  background-image: url(${hexagonFrame});
  background-repeat: no-repeat;
  background-position: center;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  border-radius: 50%;
`;
const PositionContainer = styled.div`
  width: 20%;
  height: 20%;
  position: absolute;
  left: ${({ left }) => left && left};
  top: ${({ top }) => top && top};
  right: ${({ right }) => right && right};
  bottom: ${({ bottom }) => bottom && bottom};
`;
