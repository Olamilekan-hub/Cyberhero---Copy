import React from "react";
import styled from "styled-components";

const SingleRoundedBorder = ({ children, width, height }) => {
  return (
    <MainContainer width={width} height={height}>
      {children}
    </MainContainer>
  );
};

export default SingleRoundedBorder;

const MainContainer = styled.div`
  border: 1px solid var(--trans-cyan);
  border-radius: 25px;
  padding: 2%;
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  background-color: var(--blue);
`;
