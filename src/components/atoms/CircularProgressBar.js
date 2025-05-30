import React from "react";
import styled from "styled-components";

const CircularProgressBar = ({ sqSize, radius, percentage, strokeWidth }) => {
  // Enclose the circle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <CircleBackground
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <CircleProgress
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />

      <CircleDashed
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        style={{
          strokeDasharray: "10 10",
        }}
      />
    </svg>
  );
};

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10,
};

export default CircularProgressBar;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #ddd;
`;

const CircleDashed = styled.circle`
  stroke: #1d31bb;
  fill: none;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: var(--green);
`;
