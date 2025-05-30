import React from "react";
import styled from "styled-components";
import LeaderBoardItem from "../atoms/LeaderBoardItem";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../atoms/Header";
const LeaderBoardContainer = ({ leaderBoard }) => {
  const sortedData = [...leaderBoard].sort((a, b) => b.xp - a.xp);
  return (
    <MainContainer>
      <DoubleBorderFrame>
        <Header color="white" font="Bionic" mobileSize={14}>
          Achievement
        </Header>
        <ItemsContainer>
          {sortedData &&
            sortedData.map((item, index) => {
              if(index > 10) return;
              const { _id, xp, username } = item;
              return (
                <LeaderBoardItem
                  key={_id}
                  name={username}
                  xpTotal={xp}
                  itemIndex={index}
                />
              );
            })}
        </ItemsContainer>
      </DoubleBorderFrame>
    </MainContainer>
  );
};

export default LeaderBoardContainer;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  overflow-wrap: break-word;
  @media (min-width: 768px) {
    width: calc((100% - 16px) / 2);
  };
  box-sizing: border-box;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  padding: 0 15px;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  @media (min-width: 1024px) {
    height: 100%;
  }
`;
