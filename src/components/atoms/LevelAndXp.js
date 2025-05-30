import React from "react";
import styled from "styled-components";

import { Line } from "rc-progress";
import { getLevelFromXP } from "../../utils/utils";
import SingleBorderFrame from "../containers/SingleBorderFrame";

export default function LevelAndXp({ xp }) {
  const levelData = getLevelFromXP(xp);
  const { level, percentageToNextLevel } = levelData;
  // console.log(levelData);
  return (
    <ContainerLevelAndXp>
      <h3>
        level <LevelNumber>{level}</LevelNumber>
      </h3>
      <SingleBorderFrame height={"250px"} width="300px">
        <XpBar
          percent={percentageToNextLevel}
          strokeWidth="5"
          strokeColor="var(--cyan)"
          trailWidth="5"
        />
        <XpBar
          percent={percentageToNextLevel}
          strokeWidth="5"
          strokeColor="var(--cyan)"
          trailWidth="5"
        />
        <XpBar
          percent={percentageToNextLevel}
          strokeWidth="5"
          strokeColor="var(--cyan)"
          trailWidth="5"
        />
        <XpBar
          percent={percentageToNextLevel}
          strokeWidth="5"
          strokeColor="var(--cyan)"
          trailWidth="5"
        />
      </SingleBorderFrame>
    </ContainerLevelAndXp>
  );
}

LevelAndXp.defaultProps = {
  xp: 0,
};

const ContainerLevelAndXp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LevelNumber = styled.span`
  font-size: 20px;
`;
const XpBar = styled(Line)`
  margin: 10px 0;
`;
