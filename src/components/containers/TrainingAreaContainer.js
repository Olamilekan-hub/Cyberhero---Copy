import React from "react";
import { useState } from "react";
import styled from "styled-components";

import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../atoms/Header";
import TaskContainer from "./TaskContainer";
import TrainingAreaCard from "../atoms/TrainingAreaCard";
const TrainingAreaContainer = ({
  data,
  task,
  back,
  currentStatus,
  missionType,
  eventBG,
  assets,
  finishTask,
  setBG,
  dispatch,
  completed
}) => {
  console.log(currentStatus)
  const [articleID, setArticleID] = useState(null);
  const taskType = {
    watch: { title: "Video", btnText: "Play" },
    read: { title: "Article", btnText: "Read" },
    create: { title: "Create", btnText: "Create" },
    action: { title: "Action", btnText: "Start" },
  };
  const setID = (index) => {
    setArticleID(index);
  };
  const backToSelect = () => {
    setArticleID(null);
  };
  return articleID == null && task !== "event" ? (
    <ArticleSelectionContainer>
      <DoubleBorderFrame>
        <Header color="white" font="Bionic">
          Training Area
        </Header>
        <p>Read the articles and earn XP</p>
        <TrainingAreaCardsContainer>
          <TrainingAreaCards>
            {data.map((item, index) => 
              <TrainingAreaCard
                title={`${taskType[`${task}`].title} ${index + 1}`}
                btnText={`${taskType[`${task}`].btnText}`}
                callback={() => setID(index)}
                setBG={setBG}
                inside = {index < 3}
                status={currentStatus?.[`${task}`]?.[index]}
              />
            )}
          </TrainingAreaCards>
        </TrainingAreaCardsContainer>
      </DoubleBorderFrame>
    </ArticleSelectionContainer>
  ) : (
    <TaskContainer
      task={task}
      tasksData={data[articleID]}
      articleID={articleID}
      missionType={missionType}
      eventBG={eventBG}
      backToMission={back}
      backToSelect={backToSelect}
      finishTask={finishTask}
      setBG={setBG}
      dispatch={dispatch}
      assets={assets}
    />
  );
};

export default TrainingAreaContainer;

const ArticleSelectionContainer = styled.div`
  text-align: center;
  p {
    color: var(--cyan);
  }
`;
const TrainingAreaCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TrainingAreaCards = styled.div`
  display: flex;
  margin: auto;
  gap: 10px;
  flex-wrap: wrap;
`;
