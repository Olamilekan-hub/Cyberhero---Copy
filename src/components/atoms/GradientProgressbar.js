import React from "react";
import styled from "styled-components";
const GradientProgressbar = ({ width, height, percentage, profile }) => {
  return (
    <MainContainer width={width} height={height} profile={profile}>
      <ActiveProgress percentage={percentage}></ActiveProgress>
    </MainContainer>
  );
};

export default GradientProgressbar;

const MainContainer = styled.div`
  padding: 2px 2px 2px 0;
  background-color: var(--trans-grey);
  border-radius: 0 10px 10px 0;
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};

  @media (max-width: 767px) {
    ${({ profile }) => profile && "width: 100%;"}
  }
  @media (max-width: 426px) {
    ${({ profile }) => profile && "width: 55%;"}
  }
`;

const ActiveProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, purple, darkorange);
  border-radius: 10px;
  width: 0%;
  transition: width 0.5s ease-in-out;
    ${({ percentage }) => percentage && `width: ${percentage}%`};
`;
